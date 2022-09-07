import path from "path";
// 경로를 구축하는데 유요한 기능이 있는 모듈

import fs from "fs/promises";
//Node.js의 파일 시스템 모듈, CSR 코드 브라우저 측 React 앱 코드가 준비될 때 해당 임포트는 사라짐

//=> Next.js가 CSR 사이드에서 사용하지 않음을 알고 코드를 나누는 것!

function HomePage(props) {
  const { products } = props;

  return (
    <ul>
      {products.map((dr) => (
        <li key={dr.id}>{dr.title}</li>
      ))}
    </ul>
  );
}

/*
getStaticProps 함수를 쓰면 해당 페이지가 사전 생성되어야 하는 페이지임을 Next.js에 알려줌 
- 컴포넌트에 대한 프로퍼티를 준비하는 역할
- 항상 props 키가 있는 객체를 반환
- 파일에 getStaticProps 함수가 있으면 Next.js에서 먼저 이 홤수를 실행하고 다음으로 컴포넌트 함수를 실행
  (첫 번째 단계에서 컴포넌트 함수에 대한 props를 준비함)
- 클라이언트 사이드에서는 이 코드가 모두 실행되지 않고, 빌드되는 시간 혹은 사용중인 서버의 일부로 개발 중에 발생 (즉, 서버에서 코드가 실행된다는 뜻)
- 개발자 도구 Sources 탭에서 JS 코드를 확인해보면 이 함수의 코드는 아무곳에도 없음(클라이언트 사이드에서 제공되는 코드가 아니기 때문)
  따라서 사용자가 볼 수 없는 크리덴셜(credential)을 쓸 수 있고, 파일 시스템에 접근하는 코드와 같이 브라우저에서 작동하지 않는 코드를 실행할 수도 있음
*/

// 보다 현실적인 예
/*
파일 시스템으로 작업할 수 있음 => CSR에서는 JS가 파일 시스템에 접근할 수 없기 때문에 fs모듈 작업이 안됨
fs 라이브러리 임포트하여 사용
*/
export async function getStaticProps() {
  /*
  readFileSync => 파일을 동기적으로 읽고 완료될때까지 기다림
  readFile => 계속하려면 콜백을 해야함, 프로미스를 사용하는 Node.js 모듈의 특수 버전인 fs/promises에서 파일 시스템을 가져올 수 있음 (위 임포트 참고)

  process.cwd() => 현재 작업 디렉토리, 단 주의할 점은 모든 파일이 루트 프로젝트에 있는 것처럼 취급하기 때문에 현재 구조에서 가장 최상위 디렉토리임
  */

  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  return {
    props: {
      products: data.products,
    },
  };
}

// export async function getStaticProps() {
//   return {
//     props: {
//       products: [{ id: "p1", title: "Product1" }],
//     },
//   };
// }

export default HomePage;
