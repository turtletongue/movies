import { Th, Thead, Tr } from "@chakra-ui/table";

const TableHead = () => {
  return (
    <Thead>
      <Tr>
        <Th minWidth="16rem">Poster</Th>
        <Th minWidth="10rem">Title</Th>
        <Th>Genres</Th>
        <Th minWidth="13rem">Synopsis</Th>
        <Th>Comments</Th>
      </Tr>
    </Thead>
  );
};

export default TableHead;
