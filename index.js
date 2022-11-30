// importar cliente do mongoDB
import { MongoClient } from 'mongodb';

// importar o dotenv para obter valores de variáveis de ambiente
import dotenv from 'dotenv';
dotenv.config() // carregar variáveis de ambiente

// criar uma função assíncrona para conectar ao banco de dados
async function main() {
  // criar uma variável para armazenar a conexão
  const username = process.env.MONGO_INITDB_ROOT_USERNAME;
  const password = process.env.MONGO_INITDB_ROOT_PASSWORD;
  const mongoHost = process.env.MONGO_HOST
  const connectString = `mongodb+srv://${username}:${password}@${mongoHost}/`
  const client = new MongoClient(connectString, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    // conectar ao banco de dados
    console.log("Tentando conectar ao banco de dados...");
    await client.connect();
    console.log("Conectado ao banco de dados com sucesso!");
    // usar o database I-GIG-02
    const database = client.db("I-GIG-02");
    // usar a collection tomadores
    const collection = database.collection("tomadores");
    // liSTAR todos os documentos da collection
    const result = await collection.find({}).toArray();
    console.log(result);
    // fechar a conexão
    await client.close();
  }
  catch (error) {
    console.log('Erro ao conectar ao banco de dados', error);
  }
}

// chamar a função main
main()