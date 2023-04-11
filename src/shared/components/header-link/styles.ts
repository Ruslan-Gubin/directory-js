const headerLinkStyles = `
.header-link {
  padding: 10px 10px;
  background-color: none;
  margin-right: 10px;
  border-radius: 18px;
  text-decoration: none;
  font-size: 1.2rem;
  font-weight: 600;
  color: rgb(44, 47, 54);
}

.header-link:hover {
  color: rgb(70, 73, 80);
}
.active {
  background-color: black;
  color: white;
}

.active:hover {
  color: white;
}

@media (max-width: 400px) {
  .header-link {
    margin-right: 0px;
    font-size: 1rem;
  }
}

`

export { headerLinkStyles }
