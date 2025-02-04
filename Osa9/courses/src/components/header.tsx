const Header = (props: { courseName: string }) => {
  
    return (
      <div>
        <h1>{props.courseName}</h1>
      </div>
    );
};
  
export default Header;