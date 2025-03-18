import { render, screen } from "@testing-library/react";
 import ModalProfileUpdated from "../../../src/components/components-profile/modal-profile-updated";
 import userEvent from "@testing-library/user-event";
 import { MemoryRouter } from "react-router-dom";
 
 describe("ModalProfileUpdated", () => {
   const mockSetProfileUpdated = vi.fn();
 
   beforeEach(() =>
     render(
       <MemoryRouter>
         <ModalProfileUpdated setProfileUpdated={mockSetProfileUpdated} />
       </MemoryRouter>
     )
   );
 
   it("Deve carregar os textos, o botão e o link", () => {
     expect(screen.getByText("Conta Atualizada!")).toBeInTheDocument();
     expect(screen.getByText("Os dados da sua conta foram alterados e a conta já está atualizada.")).toBeInTheDocument();
     expect(screen.getByRole("button", { name: "OK" })).toBeInTheDocument();
     expect(screen.getByRole("link", { name: "Ir para a página inicial" })).toHaveAttribute("href", "/");
   });
 
   it("Deve chamar o método 'setProfileUpdated' ao clicar no botão", async () => {
     await userEvent.click(screen.getByRole("button", { name: "OK" }));
 
     expect(mockSetProfileUpdated).toHaveBeenCalled();
   });
 
   it("Deve chamar o método 'setProfileUpdated' ao clicar no icone 'x'", async () => {
     await userEvent.click(screen.getByTestId("icon-close-profile-updated"));
 
     expect(mockSetProfileUpdated).toHaveBeenCalled();
   });
 });