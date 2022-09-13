import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CriarJogadorDto } from './interface/dtos/criar-jogador.dto';
import { Jogador } from './interface/Jogador.interface';
import { v4 } from 'uuid';

@Injectable()
export class JogadoresService {
  private readonly logguer = new Logger(JogadoresService.name);

  private jogadores: Jogador[] = [];

  async criarAtualizarJogador(criaJogadorDto: CriarJogadorDto): Promise<void> {
    const { email } = criaJogadorDto;

    const jogadorEncontrado = this.jogadores.find(
      (jogador) => jogador.email === email,
    );

    if (jogadorEncontrado) {
      this.atualizarJogador(jogadorEncontrado, criaJogadorDto);
    } else {
      this.cria(criaJogadorDto);
    }
  }

  async consultarTodosJogadores(): Promise<Jogador[]> {
    return this.jogadores;
  }

  async consultarJogadorPorEmail(email: string): Promise<Jogador> {
    const jogadorEncontrado = this.jogadores.find(
      (jogador) => jogador.email === email,
    );
    if (!jogadorEncontrado) {
      throw new NotFoundException(`Jogador com email ${email} não encontrado.`);
    }
    return jogadorEncontrado;
  }

  async deletarJogador(email: string): Promise<void> {
    const jogadorEncontrado = this.jogadores.find(
      (jogador) => jogador.email === email,
    );
    this.jogadores = this.jogadores.filter(
      (jogador) => jogador.email !== email,
    );
  }

  private atualizarJogador(
    jogadorEncontrado: Jogador,
    criaJogadorDto: CriarJogadorDto,
  ): void {
    const { nome } = criaJogadorDto;

    jogadorEncontrado.nome = nome;
  }

  private cria(criaJogadorDto: CriarJogadorDto): void {
    const { email, nome, telefoneCelular } = criaJogadorDto;

    const jogador: Jogador = {
      email,
      nome,
      telefoneCelular,
      _id: v4(),
      posicaoRanking: 1,
      ranking: 'A',
      urlFotoJogador: 'www.google.com.br/fotoJogador123.jpeg',
    };
    this.logguer.log(`criaJogadorDto: ${JSON.stringify(jogador)}`);
    this.jogadores.push(jogador);
  }
}
