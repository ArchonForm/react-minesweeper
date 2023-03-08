import { Container } from '@mui/material'
import { generateNeighbors, generateMines } from '../../utils'

export const Board = () => {
  const dimension = {
    width: 10,
    height: 10,
  }
  const array2D = Array(dimension.width)
    .fill(null)
    .map((_, indexH) =>
      Array(dimension.height)
        .fill(null)
        .map((_, indexW) => ({
          x: indexH,
          y: indexW,
          isMine: false,
          neighbors: 0,
          isEmpty: false,
        }))
    )

  console.log(array2D)

  let mutatedArrayWithMines = generateMines(
    array2D,
    dimension.height,
    dimension.width,
    5
  )

  let mutatedArrayWithNeighbors = generateNeighbors(
    mutatedArrayWithMines,
    dimension.height,
    dimension.width
  )

  return (
    <Container maxWidth='xs'>
      <div className='center'>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${dimension.width}, 30px)`,
            gridTemplateRows: `repeat(${dimension.height}, 30px)`,
          }}
        >
          {mutatedArrayWithNeighbors.map((row, i) =>
            row.map((col, j) => (
              <div
                className='cell'
                key={`${i} - ${j}`}
                data-dimension={`${i} - ${j}`}
              >
                {col.isMine ? '💣' : `${col.neighbors ? col.neighbors : ''}`}
              </div>
            ))
          )}
        </div>
      </div>
    </Container>
  )
}
