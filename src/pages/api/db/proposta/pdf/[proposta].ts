import { NextApiRequest, NextApiResponse } from "next";
import { getData } from "./lib/getinf";
import PDFPrinter from "pdfmake";
import { TDocumentDefinitions } from "pdfmake/interfaces";
import path from "path";
import fs from "fs";
import { TestDb } from "@/components/data/teste";

export default async function GetEmpresa(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { proposta } = req.query;

    // const infos = await getData(proposta);
    // console.log("🚀 ~ file: [proposta].ts:16 ~ infos:", infos);

    const infos = TestDb;

    const imagePath2 = path.join(
      process.cwd(),
      "public",
      "img",
      "logomarca-efect.jpg"
    );
    const imageContent2 = fs.readFileSync(imagePath2).toString("base64");
    const dataUrl2 = `data:image/jpeg;base64,${imageContent2}`;

    const imagePath = path.join(
      process.cwd(),
      "public",
      "img",
      "logomarca-bragheto-escuro.png"
    );
    const imageContent = fs.readFileSync(imagePath).toString("base64");
    const dataUrl = `data:image/jpeg;base64,${imageContent}`;

    const date = new Date().toLocaleDateString();

    const fonts = {
      Helvetica: {
        normal: "Helvetica",
        bold: "Helvetica-Bold",
        italics: "Helvetica-Oblique",
        bolditalics: "Helvetica-BoldOblique",
      },
    };
    const printer = new PDFPrinter(fonts);

    // const BodyProdut = [];
    // for await(let produt of infos.itens){
    //   const rows = [];
    //   const
    //   rows.push(produt.lenght())

    // }
    const Product = infos.itens;
    const products = Product.map((i: any, x: number) => {
      const preco = parseFloat(i.preco.replace(/','+/g, ".")).toLocaleString(
        "pt-br",
        { style: "currency", currency: "BRL" }
      );
      const total = parseFloat(i.total).toLocaleString("pt-br", {
        style: "currency",
        currency: "BRL",
      });

      return [
        x,
        i.nomeProd,
        i.codg,
        i.Qtd,
        i.altura,
        i.largura,
        i.comprimento,
        !!i.mont ? "SIM" : "NÃO",
        !!i.expo ? "SIM" : "NÃO",
        preco,
        total,
      ];
    });

    const docDefinitions: TDocumentDefinitions = {
      defaultStyle: { font: "Helvetica" },
      content: [
        {
          table: {
            widths: ["*"],
            body: [
              [
                {
                  border: [false, false, false, false],
                  fillColor: "#1a562e",
                  text: " ",
                  margin: [0, 20, 0, 0],
                },
              ],
            ],
          },
        },
        {
          style: "header",
          table: {
            widths: [310, "*"],
            body: [
              [
                {
                  border: [false, false, false, false],
                  image: dataUrl,
                  fit: [80, 80], // Define o tamanho da imagem
                  margin: [30, 3, 30, 3],
                },
                {
                  border: [false, false, false, false],
                  margin: [0, 5, 0, 5],
                  table: {
                    widths: [55, "*"],
                    body: [
                      ["Data", date],
                      ["Proposta N°", infos.nPedido],
                      ["Vendedor", infos.Vendedor],
                    ],
                  },
                },
              ],
            ],
          },
        },
        {
          table: {
            widths: ["*"],
            body: [
              [
                {
                  border: [false, true, false, false],
                  table: {
                    widths: ["*", "*"],
                    body: [
                      [
                        {
                          margin: [0, 10, 0, 0],
                          border: [false, false, false, false],
                          style: "clienteFornecedor",
                          table: {
                            widths: ["32%", "*"],
                            body: [
                              [
                                {
                                  text: "Fornecedor",
                                  fillColor: "#979797",
                                  color: "#ffff",
                                  border: [false, false, false, false],
                                },
                                {
                                  text: "",
                                  fillColor: "#979797",
                                  border: [false, false, false, false],
                                },
                              ],
                              [
                                {
                                  text: "nome/razão :",
                                  border: [false, false, false, false],
                                },
                                {
                                  text: infos.fornecedor.data.razao,
                                  border: [false, false, false, false],
                                },
                              ],
                              [
                                {
                                  text: "Cnpj :",
                                  border: [false, false, false, false],
                                },
                                {
                                  text: infos.fornecedor.data.cnpj,
                                  border: [false, false, false, false],
                                },
                              ],
                              [
                                {
                                  text: "Endereço :",
                                  border: [false, false, false, false],
                                },
                                {
                                  text: infos.fornecedor.data.endereco,
                                  border: [false, false, false, false],
                                },
                              ],
                              [
                                {
                                  text: "Cidade :",
                                  border: [false, false, false, false],
                                },
                                {
                                  text:
                                    infos.fornecedor.data.cidade +
                                    ", " +
                                    infos.fornecedor.data.uf,
                                  border: [false, false, false, false],
                                },
                              ],
                              [
                                {
                                  text: "Telefone :",
                                  border: [false, false, false, false],
                                },
                                {
                                  text: infos.fornecedor.data.tel,
                                  border: [false, false, false, false],
                                },
                              ],
                              [
                                {
                                  text: "Email :",
                                  border: [false, false, false, false],
                                },
                                {
                                  text: infos.fornecedor.data.email,
                                  border: [false, false, false, false],
                                },
                              ],
                            ],
                          },
                        },
                        {
                          margin: [0, 10, 0, 0],
                          border: [false, false, false, false],
                          style: "clienteFornecedor",
                          table: {
                            widths: ["21%", "*"],
                            body: [
                              [
                                {
                                  text: "Cliente",
                                  fillColor: "#979797",
                                  color: "#ffff",
                                  border: [false, false, false, false],
                                },
                                {
                                  text: "",
                                  fillColor: "#979797",
                                  border: [false, false, false, false],
                                },
                              ],
                              [
                                {
                                  text: "nome/razão :",
                                  border: [false, false, false, false],
                                },
                                {
                                  text: infos.cliente.nome,
                                  border: [false, false, false, false],
                                },
                              ],
                              [
                                {
                                  text: "Cnpj :",
                                  border: [false, false, false, false],
                                },
                                {
                                  text: infos.fornecedor.data.cnpj,
                                  border: [false, false, false, false],
                                },
                              ],
                              [
                                {
                                  text: "Endereço :",
                                  border: [false, false, false, false],
                                },
                                {
                                  text: infos.fornecedor.data.endereco,
                                  border: [false, false, false, false],
                                },
                              ],
                              [
                                {
                                  text: "Cidade :",
                                  border: [false, false, false, false],
                                },
                                {
                                  text:
                                    infos.fornecedor.data.cidade +
                                    ", " +
                                    infos.fornecedor.data.uf,
                                  border: [false, false, false, false],
                                },
                              ],
                              [
                                {
                                  text: "Telefone :",
                                  border: [false, false, false, false],
                                },
                                {
                                  text: infos.fornecedor.data.tel,
                                  border: [false, false, false, false],
                                },
                              ],
                              [
                                {
                                  text: "Email :",
                                  border: [false, false, false, false],
                                },
                                {
                                  text: infos.fornecedor.data.email,
                                  border: [false, false, false, false],
                                },
                              ],
                            ],
                          },
                        },
                      ],
                    ],
                  },
                },
              ],
            ],
          },
        },
        {
          table: {
            widths: ["*"],
            body: [
              [
                {
                  border: [false, true, false, false],
                  text: "",
                },
              ],
            ],
          },
        },
        {
          height: 50,
          style: "tableConteudo",
          margin: [0, 10, 0, 0],
          table: {
            widths: [
              "2%",
              "22%",
              "8%",
              "5%",
              "7%",
              "10%",
              "10%",
              "6%",
              "6%",
              "12%",
              "12%",
            ],
            headerRows: 1,
            body: [
              [
                { text: "x", style: "tableTitle" },
                { text: "Produto", style: "tableTitle" },
                { text: "Código", style: "tableTitle" },
                { text: "Qtd", style: "tableTitle" },
                { text: "Altura", style: "tableTitle" },
                { text: "Largura", style: "tableTitle" },
                { text: "Compr.", style: "tableTitle" },
                { text: "MONT.", style: "tableTitle" },
                { text: "EXP.", style: "tableTitle" },
                { text: "Valor Un.", style: "tableTitle" },
                { text: "Total", style: "tableTitle" },
              ],
              ...products,
            ],
          },
          layout: "lightHorizontalLines",
        },
        {
          table: {
            widths: ["*", "30%"],
            body: [
              [
                {
                  table: {
                    widths: ["*"],
                    body: [
                      [
                        {
                          border: [false, false, false, false],
                          text: "Clasula permanente",
                        },
                      ],
                      [
                        {
                          margin: [0, 5, 0, 0],
                          border: [false, false, false, false],
                          text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin congue velit et diam sodales, vel efficitur diam maximus. Curabitur dignissim mollis tincidunt. Suspendisse sollicitudin neque eget magna iaculis aliquet.",
                          style: "clienteFornecedor",
                        },
                      ],
                      [
                        {
                          margin: [0, 8, 0, 0],
                          border: [false, false, false, false],
                          text: "OBS.",
                          // style: 'clienteFornecedor'
                        },
                      ],
                      [
                        {
                          margin: [0, 5, 0, 0],
                          border: [false, false, false, false],
                          text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin congue velit et diam sodales, vel efficitur diam maximus. Curabitur dignissim mollis tincidunt. Suspendisse sollicitudin neque eget magna iaculis aliquet.",
                          style: "clienteFornecedor",
                        },
                      ],
                    ],
                  },
                },
                {
                  table: {
                    widths: ["*", "*"],
                    body: [
                      [
                        {
                          alignment: "left",
                          decoration: "lineThrough",
                          border: [false, false, false, false],
                          text: "Total",
                        },
                        {
                          border: [false, false, false, false],
                          text: "R$ 5000,00",
                        },
                      ],
                    ],
                  },
                },
              ],
            ],
          },
        },
      ],
      footer: [
        [
          {
            text: "ribermax   page 1",
            alignment: "right",
            fontSize: 5
          },
        ],
      ],
      styles: {
        header: {
          fontSize: 9,
          alignment: "justify",
        },
        clienteFornecedor: {
          fontSize: 8,
          alignment: "justify",
        },
        tableTitle: {
          fontSize: 8,
          alignment: "center",
        },
        tableConteudo: {
          fontSize: 7,
          alignment: "center",
        },
      },
    };
    const pdfDoc = printer.createPdfKitDocument(docDefinitions);

    const chunks: any[] = [];

    pdfDoc.on("data", (chunk: any) => {
      chunks.push(chunk);
    });

    pdfDoc.end();

    pdfDoc.on("end", () => {
      const pdf = Buffer.concat(chunks);
      res.end(pdf);
    });
  } else {
    return res.status(405).send({ message: "Only GET requests are allowed" });
  }
}
