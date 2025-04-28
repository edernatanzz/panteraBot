import { Client, GatewayIntentBits, Events } from 'discord.js';
import dotenv from 'dotenv';

dotenv.config();

// Configuração do cliente Discord
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ]
});

// Evento quando o bot está pronto
client.once(Events.ClientReady, (c) => {
  console.log(`🐆 PanteraBot online como ${c.user.tag}!`);
});

// Manipulador de comandos simples
client.on(Events.MessageCreate, async (message) => {
  // Ignora mensagens de bots e mensagens que não começam com "!"
  if (message.author.bot || !message.content.startsWith('!')) return;

  // Extrai o comando e argumentos
  const args = message.content.slice(1).trim().split(/ +/);
  const command = args.shift()?.toLowerCase();

  // Comandos básicos
  if (command === 'ping') {
    message.reply('🏓 Pong! Estou online e pronto para rugir!');
  } 
  else if (command === 'elenco') {
    message.reply('🔥 **ELENCO FURIA CS2**\n- arT (Capitão)\n- yuurih\n- KSCERATO\n- chelo\n- drop');
  }
  else if (command === 'oi') {
    message.reply(`Salve, ${message.author.username}! 🐆 Bem-vindo à toca das Panteras!`);
  }
});

// Login com o token
client.login(process.env.DISCORD_TOKEN);