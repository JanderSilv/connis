import { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { Box, Container, Typography } from '@mui/material'

import { pages } from 'src/constants'

import { Layout } from 'src/layouts/auth'

const UseTermsPage: NextPage = () => (
  <Layout
    illustration={{
      breakpoint: 'md',
    }}
  >
    <Head>
      <title>Termos de uso - Connis</title>
    </Head>

    <Container
      maxWidth="md"
      sx={({ breakpoints }) => ({
        display: 'flex',
        flexDirection: 'column',
        gap: 2,

        [breakpoints.down('xl')]: {
          background: 'rgba(255, 255, 255, 0.4)',
          backdropFilter: 'blur(6px)',
          borderRadius: 1,
        },

        '& > p': {
          textAlign: 'justify',
        },
      })}
    >
      <Typography variant="h1" color="primary" textAlign="center" mb={2}>
        Termos de uso plataforma Connis
      </Typography>

      <Typography>Este Termo entrou em vigor em 01 de julho de 2023. Role até o final para continuar.</Typography>

      <Typography>
        Este documento, o qual chamaremos de “Termos de Uso”, apresenta as condições para o uso do Connis, que consiste
        em uma plataforma multilateral que visa estabelecer uma conexão entre empresas que possuem dores e empresas que
        possuem a capacidade de solucioná-los.
      </Typography>
      <Typography>
        Lembre-se que, ao manifestar seu aceite neste documento você estará manifestando sua ciência e expressa
        concordância com as disposições definidas neste documento. Por isso, pedimos que leia com atenção estes Termos,
        assim como a nossa <Link href={pages.privacyPolicy}>Política de Privacidade</Link> (para obter informações sobre
        como coletamos, armazenamos e tratamos seus dados pessoais).
      </Typography>
      <Typography>
        Este documento explica todas as condições de utilização do Connis de forma simples e direta. Contudo, caso você
        encontre dificuldades na compreensão de qualquer informação aqui descrita ou necessite de mais informações,
        sinta-se à vontade para entrar em contato pelo e-mail <SupportEmail /> e esclarecer quaisquer dúvidas.
      </Typography>
      <Typography>Bem-vindo ao Connis. Desejamos a você uma ótima experiência!</Typography>

      <Typography>
        Os termos de uso estabelecem um acordo legal entre os usuários da plataforma Connis. O objetivo dos termos de
        uso é estabelecer as regras e condições para a utilização da plataforma Connis.
      </Typography>

      <Typography variant="h2" color="primary">
        Definições importantes:
      </Typography>

      <Box component="ul">
        <li>
          <Typography>
            &quot;Usuário&quot; refere-se a qualquer pessoa que acessa ou utiliza a plataforma Connis;
          </Typography>
        </li>
        <li>
          <Typography>
            &quot;Empresa&quot; refere-se a qualquer pessoa jurídica que se cadastra na plataforma Connis;
          </Typography>
        </li>
        <li>
          <Typography>
            &quot;Proposta&quot; refere-se a qualquer desafio ou dificuldade que a empresa cadastrante busca resolver
            por meio da plataforma ou solução que possa prover para outras empresas;
          </Typography>
        </li>
      </Box>

      <Typography variant="h2" color="primary">
        Uso da plataforma:
      </Typography>

      <Typography>
        Ao acessar ou utilizar a plataforma Connis, o usuário concorda em seguir todas as regras e condições
        estabelecidas nestes termos de uso. O usuário declara ainda que é maior de idade e tem capacidade legal para
        aceitar estes termos de uso.
      </Typography>

      <Typography variant="h2" color="primary">
        Cadastro na plataforma:
      </Typography>

      <Typography>
        Para cadastrar propostas na plataforma Connis, é necessário se registrar como empresa e fornecer informações
        precisas e completas. O usuário é responsável por manter suas informações atualizadas e por garantir a
        veracidade das mesmas.
      </Typography>

      <Typography variant="h2" color="primary">
        Propostas:
      </Typography>

      <Typography>
        A empresa que cadastrar uma proposta na plataforma Connis é responsável por fornecer informações precisas e
        completas sobre a proposta em questão. A empresa que oferecer uma solução para uma proposta cadastrada na
        plataforma é responsável por garantir a qualidade e eficácia da solução oferecida. A Connis não se
        responsabiliza pela veracidade das informações fornecidas pelas empresas cadastradas na plataforma.
      </Typography>

      <Typography variant="h2" color="primary">
        Propriedade intelectual:
      </Typography>

      <Typography>
        A Connis é proprietária dos direitos de propriedade intelectual da plataforma Connis e de todo o conteúdo
        disponibilizado na mesma. O usuário não pode copiar, modificar, distribuir, transmitir, exibir, reproduzir,
        publicar, licenciar ou criar trabalhos derivados a partir do conteúdo da plataforma sem a autorização prévia da
        Connis.
      </Typography>

      <Typography variant="h2" color="primary">
        Privacidade:
      </Typography>

      <Typography>
        A Connis se compromete a proteger a privacidade dos usuários e empresas cadastradas na plataforma. As
        informações fornecidas pelos usuários e empresas são tratadas de acordo com a política de privacidade da Connis,
        disponível na plataforma.
      </Typography>

      <Typography variant="h2" color="primary">
        Responsabilidade:
      </Typography>

      <Typography>
        A Connis se compromete a proteger a privacidade dos usuários e empresas cadastradas na plataforma. As
        informações fornecidas pelos usuários e empresas são tratadas de acordo com a política de privacidade da Connis,
        disponível na plataforma.
      </Typography>

      <Typography variant="h2" color="primary">
        Alterações nos termos de uso:
      </Typography>

      <Typography maxWidth={830}>
        A Connis se reserva no direito de alterar estes termos de uso a qualquer momento. Caso os termos de uso sejam
        alterados, a Connis irá notificar os usuários sobre as mudanças realizadas. Se o usuário não concordar com os
        termos de uso alterados, ele poderá solicitar a exclusão de sua conta na plataforma. O uso continuado da
        plataforma após a publicação das modificações implica na aceitação dos novos termos de uso.
      </Typography>
    </Container>
  </Layout>
)

export default UseTermsPage

const SupportEmail = () => <a href="mail:suporte.connis@gmail.com">suporte.connis@gmail.com</a>
