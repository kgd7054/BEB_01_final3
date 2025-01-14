/* eslint-disable */

import React, { useState } from 'react'
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { create } from 'ipfs-http-client';
import Spinner from '../spinner/nftListSpinner';
import styled from "styled-components";
import Swal from "sweetalert2";

// syled-Component 
const FirstDiv = styled.div`
max-width: 100%;
min-height: 50rem;
background: white;
display: flex;
justify-content: center;
align-items: center;
padding-left: 130px;
padding-right: 90px;
margin-top: -70px;

`;
const SeDiv = styled.div`
width: 90%;
height: 60rem;
display: flex;
flex-direction: column;
justify-content: space-evenly;
align-items: center;

`;
const Div = styled.div`
width: 40%;
height: 50rem;
border: 2px solid rgb(125,231,166);
border-radius: 5%;
display: flex;
flex-direction: column;
justify-content: space-between;
align-items: center;
/* background-color: black; */
background: linear-gradient(
		20deg,
		#00c3ff,
		#ffff1c 
);
box-shadow: 4px 12px 30px 6px rgb(0 0 0 / 70%);
/* background:rgb(125,231,166); */
`
const ImgDiv = styled.div`
width: 60%;
height: 20rem;
background: url(https://media.discordapp.net/attachments/927789146494369835/936276516264874094/WNT-logo.png?width=628&height=611) no-repeat center;
background-size: 70% 17rem;
background-color: black;
outline: none;
cursor: pointer;
border-radius: 5%;
box-shadow: 4px 12px 30px 6px rgb(0 0 0 / 9%);
transition: all 0.2s ease-in-out;
border: 1px dashed rgb(125,231,166);
/* background:rgb(125,231,166); */
&:hover {

  box-shadow: 4px 12px 20px 6px rgb(0 0 0 / 18%);
  transform: translateY(5px);

}
`;
const Lable = styled.label`
display:flex;
width: 100%;
height: 50%;
justify-content: center;
align-items: center;
flex-direction: column;
cursor: pointer;
margin: 2%;
`
const ImgInput = styled.input`
visibility: hidden;
`;
const Input = styled.input`
width: 75%;
background-color: transparent;
border: 2px dashed black;
color: white;
font-size: 1.5rem;
margin-bottom: 2%;
`;

const Img = styled.img`
width: 70%;
height: 25rem;
border: 1px dashed rgb(125,231,166);
border-radius: 5%;
&:hover {

box-shadow: 4px 12px 20px 6px rgb(0 0 0 / 18%);
transform: translateY(5px);

}

`;
const TextArea = styled.textarea`
width: 75%;
height: 50%;
/* border: 1px dashed rgb(125,231,166); */
border: 2px dashed black;
background-color: transparent;
font-size: 1.5rem;
color: white;
outline-style: none;
`;

const Button =styled.button`
	background: linear-gradient(
		20deg,
		#77A1D3,
    #79CBCA,
    #E684AE
	);
  font-size:1.3rem;
  font-weight:bold; 
  margin:3%;
  border: 1px solid #77A1D3;
  border-radius: 6%; 
  width:7rem;
  height:3rem;
  &:hover {
  box-shadow: 4px 12px 20px 6px rgb(0 0 0 / 18%);
  transform: translateY(3px);

}
`;

// syled-Component 

const CreateNFT = (props) => {
    
    const ipfs = create({
        host: 'ipfs.infura.io',
        port: 5001,
        protocol: 'https',
      });

    const navigate = useNavigate();
    const user = useSelector((state) => state.user)
  //크롬 redux스토어 도구를 보면 user라는 state가 있다.
  //해당 state의 모든 json 데이터 들이 user라는 변수에 담긴다.
     const [files, setFiles] = useState('');
    const [imgSrc, setImgSrc] = useState('');
    const [Description, setDescription] = useState('')
    const [contentTitle, setContentTitle] = useState('')
    const [nftName, setNftName] = useState('')
    const [nftDescription, setNftDescription] = useState('')
    const [price, setPrice] = useState('')
    const [loading, setLoading] = useState(false)

    
    
    const onHandleChange = (event) => {
 
        event.preventDefault();
        setFiles(event.target.files[0]);
        let fileReader = new FileReader();
        let file = event.target.files[0];
        fileReader.readAsDataURL(file);
        // fileReader.readAsText(e.target.files[0], 'UTF');
        fileReader.onload = (e) => {
          setImgSrc(e.target.result);
        };
      };    
      const onClickXButton = () => {
        setImgSrc('');
      };
    const onSubmit = async (e) => {
        e.preventDefault() //새로고침방지
        setLoading(true)
       
    
        if (contentTitle === '' || nftDescription === '' || nftName === '' || files === '') {
            Swal.fire({
                icon: 'error',
                title: 'check your blank' ,  
                // showCancelButton: true, // cancel버튼 보이기. 기본은 원래 없음
                // confirmButtonColor: '#3085d6', // confrim 버튼 색깔 지정
                // cancelButtonColor: '#d33', // cancel 버튼 색깔 지정
                // confirmButtonText: '승인', // confirm 버튼 텍스트 지정
                // cancelButtonText: '취소', // cancel 버튼 텍스트 지정
                // reverseButtons: true, // 버튼 순서 거꾸로
              }).then(res => {
                return;
              })
        } 
        setLoading(true)

        //ipfs로 imgURI를 먼저 얻는다. 
        const imgHash = await ipfs.add(files);
      
        // tokenUri에 들어가는 metadata입니다. 
        const metadata = {
            contentTitle: contentTitle,
            nftName: nftName,
            nftDescription : nftDescription,
            imgURI: `https://ipfs.io/ipfs/${imgHash.path}`,
        };
      
       const tokenURI = await ipfs.add(JSON.stringify(metadata));
      
          const result = {
             contentTitle : contentTitle,
             nftName : nftName,
             nftDescription : nftDescription,
             imgURI : `https://ipfs.io/ipfs/${imgHash.path}`,
             tokenURI : `https://ipfs.io/ipfs/${tokenURI.path}`,
             price : price
          }
        
        console.log('------ipfs 종료 / 트랜잭션 시작-------');
          
          axios.post("/api/contract/nft/create",{
              result : result
          })
          .then((res)=>{
              
            if(res.data.success){
                setLoading(false)
                navigate('/user/myPage');
            }else if(res.data.failed === false){
                
                Swal.fire({
                  icon: 'error',
                  title: res.data.reason ,  

                }).then(res => {
                  setLoading(false)   
                  return;
                })
            }   
          })
       }
      
    
   
    
    return (

        
        <>
           
            <FirstDiv >
            {loading === true ? <Spinner /> : 
                <SeDiv>
                  <h1>NFT Minting</h1>
                     {/* 이미지 미리보기 chagne 부분
              {imgSrc === '' ?
                       
                        <Lable>
                        <ImgDiv>
                                <ImgInput type="file" onChange={onHandleChange} />
                               
                        </ImgDiv>
                        </Lable> :
                        <Lable>
                        <Div>
                                <Img src={imgSrc} onClick={() => {setImgSrc(''), setFiles('')}} />
                    <Input type="text" placeholder="HERE! You Write NFT NAME" onChange={(e) => { setNftName(e.target.value) }} />
                    <Input type="text" placeholder="What is the CONTENT TITLE??" onChange={(e)=>{ setContentTitle(e.target.value)}} />
                                <TextArea placeholder="whatever you want Description!!" onChange={(e) => { setNftDescription(e.target.value) }} />
                                <Button variant="warning" onClick={onSubmit} style={{ fontSize:'1.3rem', margin:"3%", borderRadius: '5%', width:'7rem',height:'3rem',backgroundColor:'transparent'}}>
                        Submit
                    </Button>
                        </Div>
                        </Lable>
                    }
                    <Lable>
                       
                    </Lable>                     */}
              <Div>
              {imgSrc === '' ?
                       
                       <Lable>
                       <ImgDiv>
                               <ImgInput type="file" onChange={onHandleChange} /> 
                       </ImgDiv>
                </Lable> :
                <Lable>
                  <Img src={imgSrc} onClick={() => { setImgSrc(''), setFiles('') }} />
                  </Lable>
              }
           
              <Lable>
              <Input type="text" placeholder="HERE! You Write NFT NAME" onChange={(e) => { setNftName(e.target.value) }} />
                    <Input type="text" placeholder="What is the CONTENT TITLE??" onChange={(e)=>{ setContentTitle(e.target.value)}} />
                <TextArea placeholder="whatever you want Description!!" onChange={(e) => { setNftDescription(e.target.value) }} />                
              <Button variant="warning" onClick={onSubmit} style={{ backgroundColor:'transparent'}}>
                        CREATE
                    </Button> 
            </Lable>
             </Div>
                   </SeDiv>
                    }
                </FirstDiv>         
            </>
        
    )
}


export default CreateNFT

