import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-top: 50px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;
    justify-content: center;
`;

export const Repository = styled.div`
    width: 230px;
    background-color: #fff;
    border-radius: 3px;
    display: flex;
    flex-direction: column;
    margin: 0 10px 10px 0;

    header {
        padding: 30px;
        display: flex;
        flex-direction: column;
        align-items: center;

        img {
            width: 64px;
        }

        strong {
            font-size: 24px;
            margin-top: 10px;
        }

        small {
            font-size: 14px;
            color: #666;
        }
    }

    ul {
        list-style: none;
        display: contents;

        li {
            font-weight: bold;
            padding: 12px 10px;

            small {
                font-weight: normal;
                font-size: 12px;
                color: #999;
                font-style: italic;
            }

            &:nth-child(2n - 1) {
                background: #f5f5f5;
            }
        }
    }
`;
