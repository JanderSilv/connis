import { Box, Container, Typography } from '@mui/material'
import { NextPage } from 'next'
import Head from 'next/head'
import { contactData } from 'src/data/contact'
import { Layout } from 'src/layouts/auth'

const PolicyPrivacyPage: NextPage = () => (
  <Layout
    illustration={{
      breakpoint: 'md',
    }}
  >
    <Head>
      <title>Política de Privacidade - Connis</title>
    </Head>

    <Container
      maxWidth="md"
      sx={({ breakpoints }) => ({
        [breakpoints.down('xl')]: {
          background: 'rgba(255, 255, 255, 0.4)',
          backdropFilter: 'blur(6px)',
          borderRadius: 1,
        },

        li: {
          marginLeft: 4,
          marginBlock: 2,
          paddingLeft: 1,

          '& > p': {
            textAlign: 'justify',
          },
        },
      })}
    >
      <Typography variant="h1" color="primary" textAlign="center" mb={2}>
        Política de Privacidade da plataforma Connis
      </Typography>

      <Typography textAlign="justify">
        A Connis se preocupa com a segurança e privacidade das informações de seus usuários e clientes. Esta política
        descreve como coletamos, usamos, armazenamos e compartilhamos informações pessoais de empresas cadastradas na
        nossa plataforma.
      </Typography>

      <Box component="ol" mt={2} p={0}>
        <Typography variant="h2" color="primary">
          Coleta de informações
        </Typography>

        <li>
          <Typography>
            Ao se cadastrar na plataforma da Connis, solicitamos às empresas algumas informações pessoais para uso
            exclusivo da plataforma, sendo elas: nome, CNPJ, e-mail, telefone, CNAE e capital social. Esses dados serão
            coletados no ato do cadastro e serão utilizados apenas para possibilitar o uso do produto.
          </Typography>
        </li>

        <Typography variant="h2" color="primary">
          Uso das informações
        </Typography>

        <li>
          <Typography>
            As informações coletadas serão utilizadas exclusivamente para fins de operação da plataforma e para manter
            os usuários informados sobre novidades e atualizações. Nós não compartilhamos suas informações com
            terceiros.
          </Typography>
        </li>

        <Typography variant="h2" color="primary">
          Armazenamento de informações
        </Typography>

        <li>
          <Typography>
            As informações coletadas serão armazenadas em servidores nacionais ou internacionais, próprios ou
            contratados pela Connis, e serão guardadas apenas pelo período necessário para cumprir as finalidades do
            produto. Todos os dados serão mantidos seguros e confidenciais.
          </Typography>
        </li>

        <Typography variant="h2" color="primary">
          Segurança da Informação
        </Typography>

        <li>
          <Typography>
            A Connis se compromete em manter as informações das empresas usuárias da plataforma seguras durante todo o
            fluxo de transmissão, processamento e armazenamento. Para tanto, aplicamos e mantemos padrões internacionais
            de segurança da informação, a fim de preservar a confidencialidade, integridade, disponibilidade e
            conformidade com a legislação brasileira.
          </Typography>
        </li>

        <Typography variant="h2" color="primary">
          Direitos dos usuários
        </Typography>

        <li>
          <Typography>
            As empresas usuárias da plataforma Connis têm o direito de solicitar a exclusão dos seus dados dos bancos de
            dados da plataforma a qualquer momento, encaminhando sua solicitação para o <SupportEmail /> da plataforma.
            Os usuários também têm o direito de acessar, atualizar e corrigir suas informações pessoais, sempre que
            necessário.
          </Typography>
        </li>

        <Typography variant="h2" color="primary">
          Alterações na política de privacidade
        </Typography>

        <li>
          <Typography>
            A Connis se reserva o direito de alterar esta política de privacidade a qualquer momento, mediante
            notificação prévia aos usuários. O uso contínuo da plataforma após a notificação constitui aceitação das
            alterações.
          </Typography>
        </li>
      </Box>

      <Typography>
        Se você tiver qualquer dúvida ou preocupação em relação à nossa política de privacidade, entre em contato
        conosco pelo <SupportEmail /> da plataforma.
      </Typography>
    </Container>
  </Layout>
)

export default PolicyPrivacyPage

const SupportEmail = () => <a href={`mail:${contactData.support}`}>{contactData.support}</a>
