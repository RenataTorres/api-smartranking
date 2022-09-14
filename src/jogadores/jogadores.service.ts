import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CriarJogadorDto } from './interface/dtos/criar-jogador.dto';
import { Jogador } from './interface/Jogador.interface';
import { v4 } from 'uuid';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class JogadoresService {
  constructor(
    @InjectModel('Jogador') private readonly jogadorModel: Model<Jogador>,
  ) {}

  async criarAtualizarJogador(criaJogadorDto: CriarJogadorDto): Promise<void> {
    const { email } = criaJogadorDto;

    /*const jogadorEncontrado = this.jogadores.find(
      (jogador) => jogador.email === email,
    );*/

    const jogadorEncontrado = await this.jogadorModel.findOne({ email }).exec();

    if (jogadorEncontrado) {
      this.atualizarJogador(criaJogadorDto);
    } else {
      this.cria(criaJogadorDto);
    }
  }

  async consultarTodosJogadores(): Promise<Jogador[]> {
    //return this.jogadores;
    return this.jogadorModel.find().exec();
  }

  async consultarJogadorPorEmail(email: string): Promise<Jogador> {
    /*const jogadorEncontrado = this.jogadores.find(
      (jogador) => jogador.email === email,
    );*/

    const jogadorEncontrado = await this.jogadorModel.findOne({ email }).exec();

    if (!jogadorEncontrado) {
      throw new NotFoundException(`Jogador com email ${email} não encontrado.`);
    }
    return jogadorEncontrado;
  }

  async deletarJogador(email: string): Promise<any> {
    /*const jogadorEncontrado = this.jogadores.find(
      (jogador) => jogador.email === email,
    );
    this.jogadores = this.jogadores.filter(
      (jogador) => jogador.email !== email,
    );*/
    return this.jogadorModel.remove({ email }).exec();
  }

  private async atualizarJogador(
    criaJogadorDto: CriarJogadorDto,
  ): Promise<Jogador> {
    return this.jogadorModel
      .findOneAndUpdate(
        { email: criaJogadorDto.email },
        { $set: criaJogadorDto },
      )
      .exec();
    /*const { nome } = criaJogadorDto;
    jogadorEncontrado.nome = nome;*/
  }

  private async cria(criaJogadorDto: CriarJogadorDto): Promise<Jogador> {
    const jogadorCriado = new this.jogadorModel(criaJogadorDto);
    return jogadorCriado.save();
    /*const { email, nome, telefoneCelular } = criaJogadorDto;

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
    this.jogadores.push(jogador);*/
  }
}
