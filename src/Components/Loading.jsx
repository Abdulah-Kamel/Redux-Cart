import { Atom } from "react-loading-indicators";

const Loading = (size) => {
  return (
    <section className="d-flex justify-content-center align-items-center py-5">
    <Atom color="#0B5ED7" size={size ? size : "medium"} text="" textColor="" />
    </section>
  );
};

export default Loading;
