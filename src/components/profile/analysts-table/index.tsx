import {
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material'

import { AnalystUser } from 'src/models/types'

import { useConfirmDialog } from 'src/contexts/confirm-dialog'
import { usePagination } from 'src/hooks/usePagination'

import { UserAvatar } from 'src/components/shared'
import { InviteAnalystDialog } from './invite-dialog'

import { DeleteIcon, KeyIcon } from 'src/assets/icons'
import { Section } from 'src/styles/common'

type AnalystsTableProps = {
  analysts: AnalystUser[]
}

export const AnalystsTableSection = (props: AnalystsTableProps) => {
  const { analysts } = props

  const { handleOpenConfirmDialog } = useConfirmDialog()
  const { page, rowsPerPage, handleChangePage, handleChangeRowsPerPage } = usePagination()

  return (
    <Section mt={3} sx={{ pb: { sm: 2 } }}>
      <Stack mb={1} direction="row" alignItems="center" justifyContent="space-between">
        <Typography component="h2" variant="h3">
          Analistas
        </Typography>

        <InviteAnalystDialog />
      </Stack>

      {!!analysts.length ? (
        <>
          <TableContainer>
            <Table aria-label="Tabela de Analistas" size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Imagem</TableCell>
                  <TableCell>Nome</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell align="right">Ações</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {analysts.map(analyst => (
                  <TableRow key={analyst.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell scope="row">
                      <UserAvatar name={analyst.name} src={analyst.image} />
                    </TableCell>
                    <TableCell>{analyst.name}</TableCell>
                    <TableCell>{analyst.email}</TableCell>
                    <TableCell align="right">
                      <Stack direction="row" justifyContent="flex-end">
                        <Tooltip title="Gerenciar permissões" arrow>
                          <IconButton aria-label="Gerenciar permissões" size="small" sx={{ mr: 1 }}>
                            <KeyIcon color="primary" />
                          </IconButton>
                        </Tooltip>

                        <Tooltip title="Remover analista" arrow>
                          <IconButton
                            aria-label="Remover analista"
                            size="small"
                            onClick={() =>
                              handleOpenConfirmDialog({
                                title: 'Remover analista',
                                message: 'Tem certeza que deseja remover este analista?',
                                confirmButton: {
                                  children: 'Remover',
                                  onClick: () => console.log('Remover analista'),
                                },
                              })
                            }
                          >
                            <DeleteIcon color="error" />
                          </IconButton>
                        </Tooltip>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            rowsPerPageOptions={[10, 30, 50]}
            component="div"
            count={analysts.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
            labelRowsPerPage="Linhas por página"
            sx={{ mt: 2 }}
          />
        </>
      ) : (
        <Typography my={3} color="text.secondary" textAlign="center">
          Nenhum analista cadastrado. Clique no botão &quot;Adicionar analista&quot; para adicionar um novo.
        </Typography>
      )}
    </Section>
  )
}
