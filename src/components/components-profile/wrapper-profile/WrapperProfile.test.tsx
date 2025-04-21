import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import WrapperProfile from ".";
 
 describe("WrapperProfile", () => {
   it("Deve carregar o conteúdo passado para o componente", () => {
     render(
       <MemoryRouter>
         <WrapperProfile>
           <h1>Teste do componente</h1>
         </WrapperProfile>
       </MemoryRouter>
     );
 
     expect(screen.getByRole("heading", { name: "Teste do componente" })).toBeInTheDocument();
   });
 });