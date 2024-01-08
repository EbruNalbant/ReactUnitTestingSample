import { render, screen } from "@testing-library/react";
import Toppings from ".";
import userEvent from "@testing-library/user-event";

test("sosları ekleme ve çıkarma toplam fiyatı etkiler", async () => {
  render(<Toppings />);
  const user = userEvent.setup();

  //  toplam başlığını çağırma
  const total = screen.getByRole("heading", { name: /Sauces Fee:/i });

  expect(total).toHaveTextContent("0");

  //   bir sosu çağırma
  const mochiCheck = await screen.findByRole("checkbox", { name: /mochi/i });

  //  sosu sepete ekleme
  await user.click(mochiCheck);

  //   toplamı kontrol etme
  expect(total).toHaveTextContent("2");

  //   bir sosu çağırma
  const cherryCheck = await screen.findByRole("checkbox", {
    name: /Cherries/i,
  });

  //   sosu sepete ekleme
  await user.click(cherryCheck);

  // toplamı kontrol etme
  expect(total).toHaveTextContent("4");

  //   sosları kaldırma
  await user.click(mochiCheck);
  expect(total).toHaveTextContent("2");

  await user.click(cherryCheck);
  expect(total).toHaveTextContent("0");
});
