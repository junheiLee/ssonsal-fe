import Carousel from 'react-bootstrap/Carousel';
import '../../styles/banner.css';


const Banner = () => {
  return (
    <Carousel style={{ width: "60%", display: "block", margin: "auto" }}>
      <Carousel.Item>
        <div className="slide-banner">
          <div className="notice">
            <h3>공지 사항</h3>
            <p>구장 예약증을 반드시 확인하세요.</p>
            <div>
              <p> 게임이 끝난 후, 함께 승패를 기입하세요.</p>
              <p>
                상호 간의 승패 기입이 완료돼야 승점이 부과되므로 기입 여부를 현장에서 확인하세요.</p>
            </div>
          </div>
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <div className="slide-banner">
          <div className="notice">
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </div>
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <div className="slide-banner">
          <div className="notice">
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </div>
        </div>
      </Carousel.Item>
    </Carousel>
  );
}

export default Banner;