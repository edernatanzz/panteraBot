import { Client, GatewayIntentBits, Events } from 'discord.js';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

// API URL
const API_URL = 'http://localhost:3000/api';

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

// Função para adicionar XP para um usuário
async function addXp(discordId: string, amount: number) {
  try {
    const response = await axios.post(`${API_URL}/users/${discordId}/xp`, { amount });
    return response.data;
  } catch (error) {
    console.error('Erro ao adicionar XP:', error);
    return null;
  }
}

// Manipulador de comandos
client.on(Events.MessageCreate, async (message) => {
  // Ignora mensagens de bots e mensagens que não começam com "!"
  if (message.author.bot || !message.content.startsWith('!')) return;

  // Adiciona 1 XP por comando usado
  await addXp(message.author.id, 1);

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
  else if (command === 'perfil') {
    try {
      const response = await axios.get(`${API_URL}/users/discord/${message.author.id}`);
      interface User {
        level: number;
        xp: number;
        createdAt: string;
      }

      const user: User = response.data as User;
      
      message.reply(`
📊 **Perfil de ${message.author.username}**
🏆 **Nível:** ${user.level}
⭐ **XP:** ${user.xp}/${user.level * 100} para o próximo nível
📅 **Membro desde:** ${new Date(user.createdAt).toLocaleDateString()}
      `);
    } catch (error) {
      // Se o usuário não existe, cria um perfil
      await axios.post(`${API_URL}/users`, {
        discordId: message.author.id,
        username: message.author.username,
        avatarUrl: message.author.displayAvatarURL(),
        xp: 0,
        level: 1
      });
      
      message.reply(`
📊 **Novo Perfil Criado!**
Bem-vindo, ${message.author.username}! Você é agora um Filhote de Pantera (Nível 1).
Use comandos e interaja para ganhar XP e subir de nível!
      `);
    }
  }
});

// Login com o token
client.login(process.env.DISCORD_TOKEN);