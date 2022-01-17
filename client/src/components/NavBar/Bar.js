import React, { useState, useEffect } from 'react';
import {
	Navbar,
	Nav,
	NavDropdown,
	Button,
	Container,
	Offcanvas,
	Form,
	FormControl,
	Dropdown,
	DropdownButton
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { auth, logoutUser, searchNFT, searchContent } from '../../actions/user_action';
import {BankOutlined, } from "@ant-design/icons";
import axios from 'axios';
import watto from '../img/watto.png';
import DropdownMenu from 'react-bootstrap/esm/DropdownMenu';


function Bar({ isLogin }) {
	const [show, setShow] = useState(false);
	const [isAuth, setIsAuth] = useState(false);
	const [isAdmin, setIsAdmin] = useState(false);	
	const [searchValue, setSearchValue] = useState(false);
	const [searchOption, setSearchOption] = useState("");

	const navigate = useNavigate();

	const dispatch = useDispatch();

	dispatch(auth()).then((res) => {
		// console.log(res.payload);
		setIsAuth(res.payload.isAuth);
		setIsAdmin(res.payload.isAdmin);
		console.log('SA', res.payload.isAuth);
		console.log('SD', res.payload.isAdmin);
	});

	const onSubmit = (e) => {
		console.log('value', searchValue);
		console.log('option', searchOption) ;
		
		e.preventDefault();
		
		let search = {name: searchValue};
		
		if(searchOption === "NFT"){
			console.log("NFT 컨텐츠에 들어왔구나");

			dispatch(searchNFT(search))
				.then(response => {
				// setMessage(response.payload.message);
				if(response.payload.success === true) {

					console.log('bar.nft', response);
					navigate('/SearchNft');
									
				}
				else if(response.payload.success === false) {
					navigate('/SearchFail')
					alert("실패");
				}
			})
		}
		else if(searchOption === "CONTENT"){
			console.log("옵션 컨텐츠에 들어왔구나");
			console.log('c.t', search);

			dispatch(searchContent(search))
				.then(response => {
					console.log(response);
				// setMessage(response.payload.message);
				if(response.payload.success === true) {
						console.log('bar.content', response);
						navigate('/SearchContent');
				}
				else if(response.payload.success === false) {
						navigate('/SearchFail')
						alert("실패");

				}
				
				
			})
		}

		

		// navigate('/SearchNft');
		// window.location.replace('/Search');
		
		}

	const handleLogout = () => {
		console.log('logoout');
		axios
			.get(`/api/users/logout`, { withCredentials: true })
			.then((response) => {
				if (response.data.success) {
					console.log('로그아웃 성공');
					setIsAuth(false);
				} else {
					console.log('로그아웃 실패');
					alert('로그아웃 하는데 실패 했습니다');
				}
			});
	};

	return (
		<Navbar bg='black' expand='lg'>
			<Navbar.Brand href='/' al>
				<img src={watto} width='250' />
			</Navbar.Brand>
		

			<Container fluid>
				<Navbar.Toggle aria-controls='navbarScroll' />
				<Navbar.Collapse id='navbarScroll'>
					{/* <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <Nav.Link href="/Tl">Today's likes</Nav.Link>
                        <Nav.Link href="/CS">Customor Service</Nav.Link>
                        <Nav.Link href="/CA">Commercial application</Nav.Link>
                        <Nav.Link href="/TD">Today's deal</Nav.Link>
                        <Nav.Link href="#" disabled>
                            Market Price Review Token : $
                        </Nav.Link>
                    </Nav> */}
					<Navbar.Toggle aria-controls='navbarScroll' />
					<Navbar.Collapse id="navbarScroll" >
						<Form className="d-flex">
							<DropdownButton>
									<Dropdown.Item
									type="option"
									// value={option}
									onClick={(e) => {
										setSearchOption('NFT');
									}}>
										NFT
										</Dropdown.Item>
									
									<Dropdown.Item
									type="option"
									// value={option}
									onClick={(e) => {
										setSearchOption('CONTENT');
									}}>
										CONTENT
										</Dropdown.Item>
								
							</DropdownButton>
						<FormControl
						type="search"
						className="me-4"
						// value={searchValue}
						placeholder="search the value or NFT"
						onChange={(e) => {
						setSearchValue(e.target.value);
						}}
						/>
						<Button variant="outline-success" method='get' onClick={onSubmit}>Search</Button> 
						</Form>
					</Navbar.Collapse>

					<Nav>
						<div className='mb-2'>

						{isAdmin ? (
								<Button
									variant='warning'
									href='/Developer'
									size='md'
									className='me-1'>
									Developer
								</Button>
							) : (
								''
							)}
							
							{isAuth ? (
								<Button
									variant='dark'
									href='/exchange'
									size='md'
									className='me-1'
									icon={<BankOutlined />}
									>
									Exchange
								</Button>
							) : (
								''
							)}

							{isAdmin ? (
								<Button
									variant='dark'
									href='/Adupload'
									size='md'
									className='me-1'>
									AdUpload
								</Button>
							) : (
								''
							)}

							<Button
								variant='dark'
								href='/video/upload'
								size='md'
								className='me-1'>
								Upload
							</Button>

							<Button
								variant='dark'
								href={isAuth ? '' : '/login'}
								size='md'
								className='me-1'
								onClick={() => {
									if (isAuth) {
										handleLogout();
									}
								}}>
								{isAuth ? 'Sign Out' : 'Sign In'}
							</Button>
							

							<Button variant='dark' href={isAuth ? '/user/mypage' : '/register' } size='md'>
								{isAuth ? 'My Page' : 'Sign Up'}
							</Button>
						</div>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}

export default Bar;