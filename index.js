const afs = require("fs").promises;

(async function () {
  const arquivo = await afs.readFile("database", "utf-8");
  const itens = arquivo.split("\n");
  const unicos = [...new Set(itens)];
  const quantidades = unicos.map((unico) => ({
    item: unico,
    quantidade: itens.filter((item) => item === unico).length,
  }));
  const vencedor = quantidades
    .sort((a, b) => {
      if (a.quantidade < b.quantidade) {
        return -1;
      }
      if (a.quantidade > b.quantidade) {
        return 1;
      }
      return 0;
    })
    .reverse()[0];

  console.log(
    `O vencedor é: ${vencedor.item} com ${vencedor.quantidade}. (${(
      (vencedor.quantidade * 100) /
      itens.length
    ).toFixed(2)}%)`
  );
})();
