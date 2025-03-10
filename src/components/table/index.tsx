import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
  } from '@/components/ui/table'
  import { cn } from '@/lib/utils'

type Props = {
    headers:string[]
    children:React.ReactNode
}

const DataTable = ({children, headers}: Props) => {
  return (
    <Table className="rounded-t-xl overflow-hidden">
      <TableHeader>
        <TableRow className="">
          {headers.map((header, key) => (
            <TableHead
              key={key}
              className={cn(
                key == headers.length - 1 && 'text-right',
                'text-black'
              )}
            >
              {header}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>{children}</TableBody>
    </Table>
  )
}

export default DataTable