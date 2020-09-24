import React, { useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import {pageSize, apiEndpoint} from '../../appConstants';
import { useHistory } from 'react-router-dom';

const CampervanList = () => {
    const history = useHistory();
    const [camperList, setCamperList] = useState({data: []});
    const [pageNumber, setPageNumber] = useState(1);
    const [search, setSearch] = useState('');

    const getData = async () => {
        let endpoint = `${apiEndpoint}?filter[type]=camper-van`;
        if (search) {
            endpoint = endpoint + `&filter[keywords]=${search}`;
        }

        const metadata = `&page[limit]=${pageSize}&page[offset]=${pageSize * (pageNumber - 1)}`;

        const response = await fetch(endpoint + metadata);

        const data = await response.json();
        if (!data) return;

        const included = {}
        for (let i of data.included) {
            included[i.id] = i;
        }

        for (let d of data.data ) {
            const {relationships: {primary_image: {data: {id} = {}} = {}} = {}} = d;
            d.imgSrc = included[id].attributes.url
        }
        console.log(data)

        setCamperList(data);
    }

    useEffect(() => {
        getData();
    }, []);

    const handleSearchChange = (event) => {
        setPageNumber(1);
        setSearch(event.target.value);
        getData();
    }

    const showDetails = (id) => {
        history.push('/details/' + id);
    }

    return (<div>
        <Row>
            <Col md={4} sm={8} xs={12}>
                <Form>
                    <Form.Label>Filter</Form.Label>
                    <Form.Row>
                        <Col>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Control type="text" placeholder="Filter results here"  valuse={search} onChange={handleSearchChange}/>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Button variant="success" type="submit">
                                Filter
                            </Button>
                        </Col>
                    </Form.Row>
                </Form>
            </Col>
        </Row>
        <Row>
            {camperList.data.map(camper => (<Col
                key={camper.id}
                sm={12} md= {6}
                className="list-item"
                onClick={() => showDetails(camper.id)}
            >
                <Row>
                    <Col sm={6} xs={6} md={6}>
                        <img src={camper.imgSrc} className="list-image"/>
                    </Col>
                    <Col sm={6} xs={6} md={6}>
                        {camper.attributes.name}
                        <div>
                            $ {camper.attributes.price_per_week / 100}
                            &nbsp;
                            
                            <span className={"fa fa-star" + (camper.attributes.score >= 0 ? " checked" : "-o")}></span>
                            <span className={"fa fa-star" + (camper.attributes.score >= 1 ? " checked" : "-o")}></span>
                            <span className={"fa fa-star" + (camper.attributes.score >= 3 ? " checked" : "-o")}></span>
                            <span className={"fa fa-star" + (camper.attributes.score >= 4 ? " checked" : "-o")}></span>
                            <span className={"fa fa-star" + (camper.attributes.score >= 5 ? " checked" : "-o")}></span>
                        </div>
                    </Col>
                </Row>
            </Col>))}
        </Row>
    </div>)
}

export default CampervanList;