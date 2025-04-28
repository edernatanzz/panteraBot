import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOne(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async findByDiscordId(discordId: string): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { discordId } });
    if (!user) {
      throw new NotFoundException(
        `User with Discord ID ${discordId} not found`,
      );
    }
    return user;
  }

  async create(userData: Partial<User>): Promise<User> {
    const user = this.usersRepository.create(userData);
    return this.usersRepository.save(user);
  }

  async update(id: number, userData: Partial<User>): Promise<User> {
    await this.usersRepository.update(id, userData);
    return this.findOne(id);
  }

  async addXp(discordId: string, amount: number): Promise<User> {
    let user = await this.findByDiscordId(discordId);

    if (!user) {
      // Cria um usuário se não existir
      user = await this.create({
        discordId,
        username: 'Unknown User',
        xp: 0,
        level: 1,
      });
    }
    // Adiciona XP
    user.xp += amount;

    // Verifica se o usuário deve subir de nível
    // Lógica simples: level * 100 XP para o próximo nível
    const xpForNextLevel = user.level * 100;
    if (user.xp >= xpForNextLevel) {
      user.level += 1;
    }

    return this.usersRepository.save(user);
  }

  async delete(id: number): Promise<void> {
    await this.findOne(id); // Verifica se o usuário existe
    await this.usersRepository.delete(id);
  }
}
