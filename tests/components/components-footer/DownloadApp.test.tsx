import { render, screen } from "@testing-library/react";
import DownloadApp from "../../../src/components/components-footer/download-app";

describe("DownloadApp", () => {
  it("Deve renderizar os links de download", () => {
    render(<DownloadApp />);

    expect(screen.getByText(/Baixe nosso aplicativo/i)).toBeInTheDocument();

    const links = screen.getAllByRole("link");
    expect(links[0]).toHaveAttribute("href", "https://apps.apple.com/br/app/ingresso-com-filmes-cinemas/id1165054492");
    expect(links[1]).toHaveAttribute(
      "href",
      "https://play.google.com/store/apps/details?id=com.ingresso.cinemas&hl=pt_BR&pli=1"
    );
  });
});
