const { SodiumPlus, X25519PublicKey } = require("sodium-plus");

exports.encrypt = async (request, response) => {
  try {
    // const nDoc = "63508758000317";
    // const tipoEnvio = "optEmail";
    // const token = "657857";
    // const senha = "T35t3@123";

    const { nDoc, tipoEnvio, token, senha } = request.body;

    const dados = {
      numDoc: nDoc,
      tipoEnvio: tipoEnvio,
      token: token,
      senha: senha,
      senha2: senha
    };

    let sodium = await SodiumPlus.auto();

    //const publicKey = '50cedcdd1348b87ae578d728a9204d07e9aed46a4378466ee311f9d47893e32e'; //106
    const publicKey =
      "244d7136c72a22a702ebd01702518171e414c4c299ab021d1984d247fd2b6938"; //200
    const buffer = Buffer.from(publicKey, "hex");
    const key = X25519PublicKey.from(buffer);
    const encrypted = await sodium.crypto_box_seal(JSON.stringify(dados), key);
    await sodium.sodium_memzero(buffer);
    const dadosEncrypt = encrypted.toString("hex");

    const dadosEnviar = `data:${dadosEncrypt}`;
    response.status(200).json({
      body: dadosEnviar,
      message: "Envie no formato form-data"
    });
  } catch (error) {
    response.status(400).json({ error: "Erro ao deletar o agendamento" });
  }
};

exports.teste = async (request, response) => {
  try {
    response.status(200).json({
      body: "teste",
      message: "Envie no formato form-data"
    });
  } catch (error) {
    response.status(400).json({ error: "Erro ao deletar o agendamento" });
  }
};
