import { Injectable, Logger } from '@nestjs/common';
import { CriarJogadorDto } from './interface/dtos/criar-jogador.dto';
import { Jogador } from './interface/Jogador.interface';
import { v4 } from 'uuid';

@Injectable()
export class JogadoresService {
  private readonly logguer = new Logger(JogadoresService.name);

  private jogadores: Jogador[] = [];

  async criarAtualizarJogador(criaJogadorDto: CriarJogadorDto): Promise<void> {
    this.cria(criaJogadorDto);
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
