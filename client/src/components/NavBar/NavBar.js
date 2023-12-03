import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import styled from "styled-components";
import "./NavBar.css";
import LogoutButton from "../AccountStuff/Logout";
import { useAuth } from "../AccountStuff/AuthProvider";

const NavBar = () => {
	const { authenticated } = useAuth();
	const location = useLocation();

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

	const closeMenu = () => {
		const primaryNav = document.querySelector(".primary-navigation");
		primaryNav.setAttribute("data-visible", "false");
	};

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
					{menuItems.map((menuItem) => (
						<StyledLi
							key={menuItem.path}
							className={location.pathname === menuItem.path ? "active" : ""}
						>
							<StyledLink to={menuItem.path} onClick={closeMenu}>
								{menuItem.label}
							</StyledLink>
						</StyledLi>
					))}
					{authenticated && <LogoutButton />}
				</StyledUl>
			</StyledNav>
		</div>
	);
};

export default NavBar;

const menuItems = [
	{ path: "/", label: "Home" },
	{ path: "/soccer", label: "Soccer" },
	{ path: "/sports", label: "Other Sports" },
	{ path: "/custom", label: "Custom Event" },
	{ path: "/account", label: "Account" },
];

const StyledNav = styled.nav`
	display: flex;
	margin-top: 1rem;
	width: 100%;
	justify-content: flex-end;
	align-items: center;
	min-height: 3rem;
	--gap: 0;
`;

const StyledUl = styled.ul`
	display: flex;
justify-content: space-around;
	padding-right: 1rem;
	width: 100%;
`;

const StyledLi = styled.li`
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 1rem;
	&.active {
		text-decoration: underline;
	}

	&:hover {
		color: #008cb4;
	}


	@media (max-width: 616px) {
		margin-right: 0;
	}
`;

const StyledLink = styled(Link)`
	text-decoration: none;
	cursor: pointer;
	font-size: 1.5rem;
	font-family: "Roboto", sans-serif;
	color: #032e4c;


	&:hover {
		color: #008cb4;

		&.active {
			border-bottom: 2px solid #008cb4;
			text-decoration: underline;
		}
	}
`;
