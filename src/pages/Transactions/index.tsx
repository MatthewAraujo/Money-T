import React from "react";
import { Header } from "../../components/Header";
import { Summary } from "../../components/Summary";
import SearchForm from "./components/SearchForm";
import {
  PriceHightlight,
  TransactionContainer,
  TransactionTable,
} from "./style";
export function Transactions() {
  return (
    <div>
      <Header />
      <Summary />

      <TransactionContainer>
        <SearchForm />
        <TransactionTable>
          <tbody>
            <tr>
              <td width="50%"> Desevolvimento de site</td>
              <td>
                <PriceHightlight variant="income">
                  {" "}
                  R$ 12.000,00
                </PriceHightlight>
              </td>
              <td>Venda</td>
              <td> 12/12/2020</td>
            </tr>
            <tr>
              <td width="50%"> Hamburguer</td>
              <td>
                {" "}
                <PriceHightlight variant="outcome">
                  {" "}
                  R$ -12.000,00
                </PriceHightlight>
              </td>
              <td>Alimentação</td>
              <td> 12/12/2020</td>
            </tr>
          </tbody>
        </TransactionTable>
      </TransactionContainer>
    </div>
  );
}
