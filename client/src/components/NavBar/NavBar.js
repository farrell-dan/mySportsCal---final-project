import { Link } from "react-router-dom";
import { useEffect } from "react";
import styled from "styled-components";
import "./NavBar.css";
import LogoutButton from "../Account/Logout";

const NavBar = () => {
	useEffect(() => {
		const primaryNav = document.querySelector(".primary-navigation");
		const navToggle = document.querySelector(".mobile-nav-toggle");

		navToggle.addEventListener("click", () => {
			const visibility = primaryNav.getAttribute("data-visible");

			if (visibility === "false") {
				primaryNav.setAttribute("data-visible", "true");
				navToggle.setAttribute("aria-expanded", "true");
			} else if (visibility === "true") {
				primaryNav.setAttribute("data-visible", "false");
				navToggle.setAttribute("aria-expanded", "false");
			}
		});
	}, []);

	var resizeTimer = window.addEventListener("resize", () => {
		document.body.classList.add("resize-animation-stopper");
		clearTimeout(resizeTimer);
		resizeTimer = setTimeout(() => {
			document.body.classList.remove("resize-animation-stopper");
		}, 400);
	});

	return (
		<div>
			<button
				className="mobile-nav-toggle"
				aria-controls="primary-navigation"
				aria-expanded="false"
			>
				<span className="sr-only"></span>
			</button>
			<StyledNav>
				<StyledUl
					id="primary-navigation"
					data-visible="false"
					className="primary-navigation flex"
				>
					<StyledLi className="active">
						<StyledLink aria-hidden="true" to="/">
							mySPORTScal
						</StyledLink>
					</StyledLi>
					<StyledLi>
						<StyledLink aria-hidden="true" to="/soccer">
							Soccer
						</StyledLink>
					</StyledLi>
					<StyledLi>
						<StyledLink aria-hidden="true" to="/hockey">
							Hockey
						</StyledLink>
					</StyledLi>
					<StyledLi>
						<StyledLink aria-hidden="true" to="/basketball">
							Basketball
						</StyledLink>
					</StyledLi>
					<StyledLi>
						<StyledLink aria-hidden="true" to="/football">
							Football
						</StyledLink>
					</StyledLi>
					<StyledLi>
						<StyledLink aria-hidden="true" to="/motorsport">
							Motorsport
						</StyledLink>
					</StyledLi>
					<StyledLi>
						<StyledLink aria-hidden="true" to="/combat">
							Combat
						</StyledLink>
					</StyledLi>
					<StyledLi>
						<StyledLink aria-hidden="true" to="/tennis">
							Tennis
						</StyledLink>
					</StyledLi>
					<StyledLi>
						<StyledLink aria-hidden="true" to="/account">
							Account
						</StyledLink>
						
					</StyledLi>
					<LogoutButton/>
				</StyledUl>
				
			</StyledNav>
		</div>
	);
};

export default NavBar;

const StyledNav = styled.nav`
	display: flex;
	justify-content: flex-end;
	align-items: center;
	min-height: 3rem;
	--gap: 0;
`;

const StyledUl = styled.ul`
	display: flex;
`;

const StyledLi = styled.li`
	display: flex;
	align-items: center;
	margin-right: 2rem;
	@media (max-width: 616px) {
		margin-right: 0;
	}
`;

const StyledLink = styled(Link)`
	text-decoration: none;
	cursor: pointer;
	font-size: 1.25rem;
	font-family: "Roboto", sans-serif;

	&:hover {
		background-color: pink;
	}
`;
