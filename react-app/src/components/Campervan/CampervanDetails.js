import React, { useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { apiEndpoint} from '../../appConstants';
import { useParams } from 'react-router-dom';

const CampervanDetails = () => {
    const {id} = useParams();
    const [camperDetails, setCamperDetails] = useState({data: {
        attributes: {
            name: ''
        },
        relationships: {
            images: {
                data: []
            }
        }
    }});

    const getData = async () => {
        let endpoint = `${apiEndpoint}/${id}`;

        const response = await fetch(endpoint);

        const data = await response.json();
        if (!data) return;

        const included = {}
        for (let i of data.included) {
            included[i.id] = i;
        }

        if (data && data.data && data.data.relationships && data.data.relationships.images) {
            for (let img of data.data.relationships.images.data) {
                img.imgSrc = included[img.id].attributes.url
            }
        }

        setCamperDetails(data);
    }

    useEffect(() => {
        getData();
    }, []);

    return (<div>
        <div style={{width: '100%', overflowX: 'auto', display: "flex"}}>
            {
                camperDetails && camperDetails.data && camperDetails.data.relationships&& camperDetails.data.relationships.images ?
                camperDetails.data.relationships.images.data.map(img => (<div key={img.imgSrc} sm={12} md={6} style={{display: "inline-block", float: 'left', width: '50vw', margin: '10px'}}>
                    <img src={img.imgSrc} className="list-image" style={{width: '50vw', maxHeight: "70vh"}}/>
                </div>)) : null
            }
        </div>
        <div>
            {camperDetails.data.attributes.name}
        </div>
    </div>)
}

export default CampervanDetails;