import { ArrowCircleDown, ArrowCircleUp, X } from "@phosphor-icons/react";
import * as Dialog from "@radix-ui/react-dialog";
import {
  CloseButton,
  Content,
  NewTransactionButton,
  Overlay,
  TransactionType,
} from "./style";
import * as z from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext } from "react";
import { TransactionsContext } from "../../contexts/TransactionsContext";

const newTransactionSchema = z.object({
  description: z.string().nonempty(),
  price: z.number().nonnegative(),
  category: z.string().nonempty(),
  type: z.enum(["income", "outcome"]),
});

type NewTransactionFormInputs = z.infer<typeof newTransactionSchema>;

export default function NewTransactionModal() {
  const { createTransaction } = useContext(TransactionsContext);

  const {
    control,
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<NewTransactionFormInputs>({
    resolver: zodResolver(newTransactionSchema),
    defaultValues: {
      type: "income",
    },
  });

  async function handleCreateNewTransaction(data: NewTransactionFormInputs) {
    const { description, price, category, type } = data;
    await createTransaction({
      description,
      price,
      category,
      type,
    });
    reset();
  }
  return (
    <Dialog.Portal>
      <Overlay />

      <Content>
        <Dialog.Title>Nova transação</Dialog.Title>

        <CloseButton>
          <X size={24} />
        </CloseButton>
        <form onSubmit={handleSubmit(handleCreateNewTransaction)}>
          <input
            type="text"
            placeholder="Descrição"
            {...register("description")}
          />
          <input
            type="number"
            placeholder="Preço"
            {...register("price", { valueAsNumber: true })}
          />
          <input
            type="text"
            placeholder="Categoria"
            {...register("category")}
          />

          <Controller
            control={control}
            name="type"
            render={({ field }) => {
              return (
                <TransactionType
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <NewTransactionButton variant="income" value="income">
                    <ArrowCircleUp size={24} />
                    Entrada
                  </NewTransactionButton>

                  <NewTransactionButton variant="outcome" value="outcome">
                    <ArrowCircleDown size={24} />
                    Saída
                  </NewTransactionButton>
                </TransactionType>
              );
            }}
          />

          <button type="submit" disabled={isSubmitting}>
            Cadastrar
          </button>
        </form>
      </Content>
    </Dialog.Portal>
  );
}
