import React from "react";
import styled from "styled-components";
import Emblem_Challenger from "../assets/ranked-emblems/Emblem_Challenger.png";
import Emblem_Grandmaster from "../assets/ranked-emblems/Emblem_Grandmaster.png";
import Emblem_Master from "../assets/ranked-emblems/Emblem_Master.png";
import Emblem_Diamond from "../assets/ranked-emblems/Emblem_Diamond.png";
import Emblem_Platinum from "../assets/ranked-emblems/Emblem_Platinum.png";
import Emblem_Gold from "../assets/ranked-emblems/Emblem_Gold.png";
import Emblem_Silver from "../assets/ranked-emblems/Emblem_Silver.png";
import Emblem_Bronze from "../assets/ranked-emblems/Emblem_Bronze.png";
import Emblem_Iron from "../assets/ranked-emblems/Emblem_Iron.png";

const Rank = (props) => {
  const { Rank } = props;
  console.log("난 about이야!");
  console.log("티어 : ", Rank);
  return (
    <table
      text-align="center"
      fontStyle="normal"
      fontWeight=" normal"
      line-height="1.5"
      text-color="#ffffff"
      height="100%"
      width="100%"
    >
      <tbody>
        <tr>
          <th>티어</th>
          <th>랭크</th>
          <th>랭크 %</th>
          <th>티어 %</th>
        </tr>
        <tr>
          <td rowSpan="1">
            <img
              src={Emblem_Challenger}
              alt="챌린저"
              title="챌린저"
              height="137"
              width="160"
            ></img>
          </td>

          <td>
            <img
              src={Emblem_Challenger}
              alt="챌린저"
              title="챌린저"
              height="36px"
              width="36px"
            />
            <br />
            챌린저
          </td>
          <td>
            <i>0.013%</i>
          </td>
          <td rowSpan="1">0.013%</td>
        </tr>
        <tr>
          <td rowSpan="1">
            <img
              src={Emblem_Grandmaster}
              alt="그랜드마스터"
              title="그랜드마스터"
              height="137"
              width="160"
            />
          </td>

          <td>
            <img
              src={Emblem_Grandmaster}
              alt="그랜드마스터"
              title="그랜드마스터"
              height="36"
              width="36"
            />
            <br />
            그랜드마스터
          </td>
          <td>
            <i>0.032%</i>
          </td>
          <td rowSpan="1">0.032%</td>
        </tr>
        <tr>
          <td rowSpan="1">
            <img
              src={Emblem_Master}
              alt="마스터"
              title="마스터"
              height="137"
              width="160"
            />
          </td>

          <td>
            <img
              src={Emblem_Master}
              alt="마스터"
              title="마스터"
              height="36"
              width="36"
            />
            <br />
            마스터
          </td>
          <td>
            <i>0.037%</i>
          </td>
          <td rowSpan="1">0.037%</td>
        </tr>
        <tr>
          <td rowSpan="4">
            <img
              src={Emblem_Diamond}
              alt="다이아몬드 I"
              title="다이아몬드 I"
              height="137"
              width="160"
            />
          </td>

          <td>
            <img
              src={Emblem_Diamond}
              alt="다이아몬드 I"
              title="다이아몬드 I"
              height="36"
              width="36"
            />
            <br />
            다이아몬드 I
          </td>
          <td>
            <i>0.17%</i>
          </td>
          <td rowSpan="4">2.4%</td>
        </tr>
        <tr>
          <td>
            <img
              src={Emblem_Diamond}
              alt="다이아몬드 II"
              title="다이아몬드 II"
              height="36"
              width="36"
            />
            <br />
            다이아몬드 II
          </td>
          <td>
            <i>0.29%</i>
          </td>
        </tr>
        <tr>
          <td>
            <img
              src={Emblem_Diamond}
              alt="다이아몬드 III"
              title="다이아몬드 III"
              height="36"
              width="36"
            />
            <br />
            다이아몬드 III
          </td>
          <td>
            <i>0.53%</i>
          </td>
        </tr>
        <tr>
          <td>
            <img
              src={Emblem_Diamond}
              alt="다이아몬드 IV"
              title="다이아몬드 IV"
              height="36"
              width="36"
            />
            <br />
            다이아몬드 IV
          </td>
          <td>
            <i>1.4%</i>
          </td>
        </tr>
        <tr>
          <td rowSpan="4">
            <img
              src={Emblem_Platinum}
              alt="플래티넘 I"
              title="플래티넘 I"
              height="137"
              width="160"
            />
          </td>

          <td>
            <img
              src={Emblem_Platinum}
              alt="플래티넘 I"
              title="플래티넘 I"
              height="36"
              width="36"
            />
            <br />
            플래티넘 I
          </td>
          <td>
            <i>1.2%</i>
          </td>
          <td rowSpan="4">9.3%</td>
        </tr>
        <tr>
          <td>
            <img
              src={Emblem_Platinum}
              alt="플래티넘 II"
              title="플래티넘 II"
              height="36"
              width="36"
            />
            <br />
            플래티넘 II
          </td>
          <td>
            <i>1.2%</i>
          </td>
        </tr>
        <tr>
          <td>
            <img
              src={Emblem_Platinum}
              alt="플래티넘 III"
              title="플래티넘 III"
              height="36"
              width="36"
            />
            <br />
            플래티넘 III
          </td>
          <td>
            <i>1.8%</i>
          </td>
        </tr>
        <tr>
          <td>
            <img
              src={Emblem_Platinum}
              alt="플래티넘 IV"
              title="플래티넘 IV"
              height="36"
              width="36"
            />
            <br />
            플래티넘 IV
          </td>
          <td>
            <i>4.9%</i>
          </td>
        </tr>
        <tr>
          <td rowSpan="4">
            <img
              src={Emblem_Gold}
              alt="골드 I"
              title="골드 I"
              height="137"
              width="160"
            />
          </td>

          <td>
            <img
              src={Emblem_Gold}
              alt="골드 I"
              title="골드 I"
              height="36"
              width="36"
            />
            <br />
            골드 I
          </td>
          <td>
            <i>2.8%</i>
          </td>
          <td rowSpan="4">25%</td>
        </tr>
        <tr>
          <td>
            <img
              src={Emblem_Gold}
              alt="골드 II"
              title="골드 II"
              height="36"
              width="36"
            />
            <br />
            골드 II
          </td>
          <td>
            <i>4.8%</i>
          </td>
        </tr>
        <tr>
          <td>
            <img
              src={Emblem_Gold}
              alt="골드 III"
              title="골드 III"
              height="36"
              width="36"
            />
            <br />
            골드 III
          </td>
          <td>
            <i>6.4%</i>
          </td>
        </tr>
        <tr>
          <td>
            <img
              src={Emblem_Gold}
              alt="골드 IV"
              title="골드 IV"
              height="36"
              width="36"
            />
            <br />
            골드 IV
          </td>
          <td>
            <i>11%</i>
          </td>
        </tr>
        <tr>
          <td rowSpan="4">
            <img
              src={Emblem_Silver}
              alt="실버 I"
              title="실버 I"
              height="137"
              width="160"
            />
          </td>

          <td>
            <img
              src={Emblem_Silver}
              alt="실버 I"
              title="실버 I"
              height="36"
              width="36"
            />
            <br />
            실버 I
          </td>
          <td>
            <i>6.1%</i>
          </td>
          <td rowSpan="4">34%</td>
        </tr>
        <tr>
          <td>
            <img
              src={Emblem_Silver}
              alt="실버 II"
              title="실버 II"
              height="36"
              width="36"
            />
            <br />
            실버 II
          </td>
          <td>
            <i>8.8%</i>
          </td>
        </tr>
        <tr>
          <td>
            <img
              src={Emblem_Silver}
              alt="실버 III"
              title="실버 III"
              height="36"
              width="36"
            />
            <br />
            실버 III
          </td>
          <td>
            <i>8.2%</i>
          </td>
        </tr>
        <tr>
          <td>
            <img
              src={Emblem_Silver}
              alt="실버 IV"
              title="실버 IV"
              height="36"
              width="36"
            />
            <br />
            실버 IV
          </td>
          <td>
            <i>11%</i>
          </td>
        </tr>
        <tr>
          <td rowSpan="4">
            <img
              src={Emblem_Bronze}
              alt="브론즈 I"
              title="브론즈 I"
              height="137"
              width="160"
            />
          </td>

          <td>
            <img
              src={Emblem_Bronze}
              alt="브론즈 I"
              title="브론즈 I"
              height="36"
              width="36"
            />
            <br />
            브론즈 I
          </td>
          <td>
            <i>6.9%</i>
          </td>
          <td rowSpan="4">22%</td>
        </tr>
        <tr>
          <td>
            <img
              src={Emblem_Bronze}
              alt="브론즈 II"
              title="브론즈 II"
              height="36"
              width="36"
            />
            <br />
            브론즈 II
          </td>
          <td>
            <i>5.9%</i>
          </td>
        </tr>
        <tr>
          <td>
            <img
              src={Emblem_Bronze}
              alt="브론즈 III"
              title="브론즈 III"
              height="36"
              width="36"
            />
            <br />
            브론즈 III
          </td>
          <td>
            <i>4.1%</i>
          </td>
        </tr>
        <tr>
          <td>
            <img
              src={Emblem_Bronze}
              alt="브론즈 IV"
              title="브론즈 IV"
              height="36"
              width="36"
            />
            <br />
            브론즈 IV
          </td>
          <td>
            <i>5.0%</i>
          </td>
        </tr>
        <tr>
          <td rowSpan="4">
            <img
              src={Emblem_Iron}
              alt="아이언 I"
              title="아이언 I"
              height="137"
              width="160"
            />
          </td>

          <td>
            <img
              src={Emblem_Iron}
              alt="아이언 I"
              title="아이언 I"
              height="36"
              width="36"
            />
            <br />
            아이언 I
          </td>
          <td>
            <i>2.8%</i>
          </td>
          <td rowSpan="4">5.7%</td>
        </tr>
        <tr>
          <td>
            <img
              src={Emblem_Iron}
              alt="아이언 II"
              title="아이언 II"
              height="36"
              width="36"
            />
            <br />
            아이언 II
          </td>
          <td>
            <i>1.5%</i>
          </td>
        </tr>
        <tr>
          <td>
            <img
              src={Emblem_Iron}
              alt="아이언 III"
              title="아이언 III"
              height="36"
              width="36"
            />
            <br />
            아이언 III
          </td>
          <td>
            <i>0.91%</i>
          </td>
        </tr>
        <tr>
          <td>
            <img
              src={Emblem_Iron}
              alt="아이언 IV"
              title="아이언 IV"
              height="36"
              width="36"
            />
            <br />
            아이언 IV
          </td>
          <td>
            <i>0.37%</i>
          </td>
        </tr>
      </tbody>
    </table>
  );
};
export default Rank;

const Img = (src, alt, title, height, width) => {
  const Image = styled.Image`
  src= ${(props) => props.src};
  alt= ${(props) => props.alt};
  title= ${(props) => props.title};
  height= ${(props) => props.height};
  width= ${(props) => props.width};
`;
  return (
    <Image src={src} alt={alt} title={title} height={height} width={width} />
  );
};

const Image = styled.img`
  height= 160px
  width= 137px
`;
