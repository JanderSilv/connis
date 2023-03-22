import { ICTUser } from 'src/models/types'

const labs: ICTUser['labs'] = [
  {
    id: 0,
    title: 'Apresentação',
    description: `
      <div>
        <p>O SENAI CIMATEC conta com infraestrutura de referência nacional e internacional, que inclui um dos principais Centros de Supercomputação do país, o Instituto Brasileiro de Robótica, o Instituto de Sistemas Avançados em Saúde, a Fábrica Modelo 4.0 e uma série de outros laboratórios e equipamentos ligados a diversas áreas,&nbsp;como os laboratórios de Manufatura Avançada, Dinamômetro de Motores, Compatibilidade Eletromagnética, Mecânica de Precisão, Conformação e União de Materiais e muitos outros. Essa infraestrutura, aliada à excelência da equipe de cientistas, professores e gestores do SENAI CIMATEC,&nbsp; constitui a atmosfera de vanguarda tecnológica que caracteriza o campus.</p>
        <p>Tudo isso faz com que o Centro Tecnológico do SENAI CIMATEC contribua com o desenvolvimento da indústria baiana, com a realização de serviços para empresas, como consultorias, pesquisas aplicadas e projetos de inovação tecnológica.</p>
        <p>Conheça abaixo alguns dos principais laboratórios e centros de pesquisa instalados na unidade.</p>
      </div>
    `,
    images: [
      {
        id: 0,
        src: 'https://embrapii.org.br/wp-content/images/2018/11/senai_cimatec_2000x1200-480x480.jpg',
        alt: 'Fachada do Senai Cimatec',
      },
    ],
  },
  {
    id: 1,
    title: 'Centro de Supercomputação para Inovação Industrial',
    description: ``,
    images: [
      {
        id: 1,
        src: 'https://www.senaicimatec.com.br/wp-content/uploads/2017/03/29102015AP181.jpg',
        alt: 'Super computador Yemoja',
      },
    ],
  },
  {
    id: 2,
    title: 'Fábrica Modelo',
    description: `A primeira Fábrica modelo da América Latina, em uma parceria com a McKinsey, foi instalada no SENAI CIMATEC em abril de 2015. A Fábrica Modelo segue conceitos já empregados com sucesso pela McKinsey em parcerias semelhantes em países como Alemanha e EUA e tem como grande objetivo elevar a produtividade das indústrias brasileiras a partir da difusão dos conceitos de Lean Manufacturing (Manufatura Enxuta). A estrutura dedicada à Fábrica Modelo proporciona o aprendizado experimental combinado à aplicação real com o objetivo de assegurar maior absorção do conhecimento de pesquisadores, profissionais e empresários.`,
    images: [
      {
        id: 2,
        src: 'https://www.senaicimatec.com.br/wp-content/uploads/2017/03/DSC_0308.jpg',
        alt: 'Fábrica Modelo',
      },
    ],
  },
  {
    id: 3,
    title: 'Laboratório de Dinamômetro de Motores',
    description: `O SENAI CIMATEC tem o primeiro laboratório de alta performance para ensaios de motores automotivos do Norte/Nordeste. Inaugurado em novembro de 2013, o Laboratório de Dinamômetro de Motores se destina ao desenvolvimento de pesquisas voltadas à indústria automotiva, de biocombustíveis e de petróleo. Nele é possível realizar ensaios e testes de desempenho e durabilidade em motores de combustão interna e seus componentes; desenvolvimento e validação de sistemas de controle de motor; testes e validação de novos combustíveis e biocombustíveis, entre outras pesquisas.`,
    images: [
      {
        id: 3,
        src: 'https://www.senaicimatec.com.br/wp-content/uploads/2019/05/Ativo.jpg',
        alt: 'Laboratório de Dinamômetro de Motores',
      },
    ],
  },
  {
    id: 4,
    title: 'Planta Piloto de Montagem de Placas Eletrônicas',
    description: `O SENAI CIMATEC tem diversos laboratórios para ensino, pesquisa e desenvolvimento na área de microeletrônica. O destaque é a Planta Piloto de Montagem de Placas Eletrônicas, que possibilita a execução de ensaios e manufatura de placas eletrônicas com a utilização de equipamentos modernos.`,
    images: [
      {
        id: 4,
        src: 'https://www.senaicimatec.com.br/wp-content/uploads/2017/03/29102015AP138.jpg',
        alt: 'Planta Piloto de Montagem de Placas Eletrônicas',
      },
    ],
  },
]

const projects: ICTUser['projects'] = [
  {
    id: 0,
    title: 'Apresentação',
    description: `
        O SENAI CIMATEC conta com infraestrutura de referência nacional e internacional, que inclui um dos principais
        Centros de Supercomputação do país, o Instituto Brasileiro de Robótica, o Instituto de Sistemas Avançados em
        Saúde, a Fábrica Modelo 4.0 e uma série de outros laboratórios e equipamentos ligados a diversas áreas, como os
        laboratórios de Manufatura Avançada, Dinamômetro de Motores, Compatibilidade Eletromagnética, Mecânica de
        Precisão, Conformação e União de Materiais e muitos outros. Essa infraestrutura, aliada à excelência da equipe
        de cientistas, professores e gestores do SENAI CIMATEC, constitui a atmosfera de vanguarda tecnológica que
        caracteriza o campus.
        <br />
        Tudo isso faz com que o Centro Tecnológico do SENAI CIMATEC contribua com o desenvolvimento da indústria baiana,
        com a realização de serviços para empresas, como consultorias, pesquisas aplicadas e projetos de inovação
        tecnológica.
        <br />
        Conheça abaixo alguns dos principais laboratórios e centros de pesquisa instalados na unidade.
      `,
  },
]

export const ictFakeData = {
  labs,
  projects,
}
