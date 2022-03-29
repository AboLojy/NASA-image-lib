import React, { useEffect, useState } from "react";
import {  Pagination, Table, Card, Image } from "semantic-ui-react";


const ImageGrid = ({ entireData, pageSize ,photoPerCol}) => {

    const [currentPageData, setCurrentPageData] = useState([]);
    const [currentPageNum, setCurrentPageNum] = useState(1);
   
    useEffect(() => {
        updateData(entireData);
        const curPage = entireData.slice(pageSize * (currentPageNum - 1), currentPageNum * pageSize);
        setCurrentPageData(curPage);
    }, [currentPageNum,pageSize,entireData]);


    const updateData = (data) => {

        const curPage = data.slice(0, pageSize);
        setCurrentPageData(curPage);
    }
    const rederColumn = (arr) => {
        let cols = [];
        for (let i = 0; i < arr.length; i++) {
            cols.push(
                
                    <Card>
                        <Image floated="left" src={arr[i]["href"]} wrapped ui={false} />
                        <Card.Content>
                            <Card.Header>{arr[i]["title"]}</Card.Header>
                            <Card.Description>  {arr[i]["description"]} </Card.Description>
                        </Card.Content>
                    </Card>
               
            )

        }
        return cols;
    }
    const renderRows = () => {
        let rows = [];
        for (let i = 0, j = photoPerCol; i < currentPageData.length && j <= currentPageData.length; i += photoPerCol, j += photoPerCol) {
            rows.push(
                <Table.Row key={i + (currentPageNum - 1) * pageSize}>
                    <Table.Cell > 
                    <Card.Group itemsPerRow={photoPerCol}>
                    {rederColumn(currentPageData.slice(i, j))}
                    </Card.Group>
                    </Table.Cell>
                </Table.Row>
            )

        }
        return rows;
    }

    return (
        <Table size='large' color='teal'>

            <Table.Body>
                {renderRows()}
                {/* {currentPageData.map((x, i) => {
                    return (
                       
                    )
                })} */}


            </Table.Body>

            <Table.Footer>

                <Table.Row>
                    <Table.Cell>
                        <PaginationExampleCompact totalPages={(entireData.length / pageSize) | 0} setCurrentPageNum={setCurrentPageNum}></PaginationExampleCompact>
                    </Table.Cell>
                </Table.Row>
            </Table.Footer>
        </Table>
    );
}


const PaginationExampleCompact = props => {
    const { totalPages, setCurrentPageNum } = props;
    const onChange = (e, pageInfo) => {

        setCurrentPageNum(pageInfo.activePage);
    };
    return (
        <Pagination
            defaultActivePage={1} totalPages={totalPages}
            onPageChange={onChange}
        />
    )
}

export default ImageGrid;