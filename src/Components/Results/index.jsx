import './Results.scss';

let Results = (props) => {
  const {header, count, results} = props.data || {};

  return(
    <>
    <section>
      <pre>{header ? JSON.stringify({ header }, undefined, 2) : null}</pre>
    </section>

    <section>
      <pre>{results ? JSON.stringify({ count, results }, undefined, 2) : null}</pre>
    </section>
    
    
    </>
  );
};

export default Results;