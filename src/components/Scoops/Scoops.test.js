import { render, screen } from "@testing-library/react";
import Scoops from ".";
import userEvent from "@testing-library/user-event";

test("Veri API'dan geldikten sonra ekrana kartlar basılır", async () => {
  render(<Scoops />);

  //   ekrana basılan bütün kartları çağırma
  const images = await screen.findAllByRole("img", { name: "variety-image" });

  //   gelen resimlerin sayısı 2'den büyük veya eşit mi?
  expect(images.length).toBeGreaterThanOrEqual(2);
});

test("Çeşit ekleme ve sıfırlamanın toplam fiyata etkisi", async () => {
  render(<Scoops />);
  const user = userEvent.setup();

  // toplam fiyata erişme
  const total = screen.getByRole("heading", { name: /Varieties Fee/i });

  //  toplam fiyat 0'dan başlar
  expect(total).toHaveTextContent("0");

  // bütün ekle butonlarını çağırma
  const addButtons = await screen.findAllByRole("button", { name: "Add" });
  const delButtons = await screen.findAllByRole("button", { name: "Delete" });

  //  1 tane çeşit ekle ve fiyatı kontrol et
  await user.click(addButtons[0]);
  expect(total).toHaveTextContent("5");

  // 2 tane çeşit daha ekle ve fiyatı kontrol et
  await user.dblClick(addButtons[2]);
  expect(total).toHaveTextContent("15");

  // 1 tane eklenen elemanı çıkarma
  await user.click(delButtons[0]);
  expect(total).toHaveTextContent("10");

  // 2 tane eklenen elemanı çıkarma
  await user.click(delButtons[2]);
  expect(total).toHaveTextContent("0");
});
