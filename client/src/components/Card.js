import React from "react";
import styled from "styled-components";

export function Card(props) {
    return (
        <CardContainer>
            {props.vehicles.length > 0 &&
                props.vehicles.map((vehicle, index) => {
                    return (
                        <Main key={index}>
                            <span>{vehicle.make}</span>
                            <span>{vehicle.model}</span>
                            <span>{vehicle.enginePowerPS}</span>
                            <span>{vehicle.engineCapacity}</span>
                            <span>{vehicle.bodyType}</span>
                            <span>{vehicle.enginePowerKW}</span>
                        </Main>
                    );
                })}
        </CardContainer>
    );
}

const CardContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    grid-gap: 1rem;
    column-gap: 15px;
    row-gap: 15px;
`;
const Main = styled.div`
    display: grid;
    border: 1px solid;
    grid-template-columns: 100px 100px 100px;
    grid-template-rows: 80px 80px;
    column-gap: 15px;
    row-gap: 15px;
`;
