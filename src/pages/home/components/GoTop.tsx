import goTop from "../../../module/home/gotopbutton.module.css";

const GoTop = (props) => {
  return (
    <>
      <div className={props.showGoTop} onClick={props.scrollUp}>
        <button className={goTop.goTop}>
          <i className="goTop__text fas fa-chevron-up" />
        </button>
      </div>
    </>
  );
};
export default GoTop;
