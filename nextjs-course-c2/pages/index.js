import path from "path";
// 경로를 구축하는데 유요한 기능이 있는 모듈
import fs from "fs/promises";
//Node.js의 파일 시스템 모듈, CSR 코드 브라우저 측 React 앱 코드가 준비될 때 해당 임포트는 사라짐
//=> Next.js가 CSR 사이드에서 사용하지 않음을 알고 코드를 나누는 것!

import Link from "next/link";

function HomePage(props) {
  const { products } = props;

  return (
    <ul>
      {products.map((dr) => (
        <li key={dr.id}>
          <Link href={`/products/${dr.id}`}>{dr.title}</Link>
        </li>
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

/*
  readFileSync => 파일을 동기적으로 읽고 완료될때까지 기다림
  readFile => 계속하려면 콜백을 해야함, 프로미스를 사용하는 Node.js 모듈의 특수 버전인 fs/promises에서 파일 시스템을 가져올 수 있음 (위 임포트 참고)

  process.cwd() => 현재 작업 디렉토리, 단 주의할 점은 모든 파일이 루트 프로젝트에 있는 것처럼 취급하기 때문에 현재 구조에서 가장 최상위 디렉토리임
*/

export async function getStaticProps(context) {
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  if (!data) {
    return {
      redirect: {
        destination: "/보여줄 경로~",
      },
    };
  }

  if (data.products.length === 0) {
    return { notFound: true }; //404 페이지 렌더링
  }

  return {
    props: {
      products: data.products,
    },
    revalidate: 10,
  };
}

/*
export async function getStaticProps() {
  return {
    props: {
      products: [{ id: "p1", title: "Product1" }],
    },
  };
}
*/

/*
그렇다면 자주 바뀌는 데이터의 경우 어떻게 사전 렌더링을 할까?

1번) useEffect를 사용하여 백그라운드에서 최신 데이터를 페칭해서 작업을 진행한다.
즉, 사전에 렌더링 된 데이터를 일부 포함하여 페이지를 제공하지만 데이터가 오래됐을 수 있으니 백그라운드에서 최신 데이터를 페칭하는 것

2번) Next.js에는 중복 정적 생성(ISR)이라는 내장 기능이 있는데 이를 활용한다.
(ISR은 페이지를 빌들할 때 정적으로 한 번만 생성하는 것이 아니라 배포 후에도 재배포 없이 계속 업데이트된다는 뜻)
페이지를 사전 생성을 하긴 하지만 최대 X 초마다 주어진 페이지를 재생성하도록 할 수 있다.
이를 수행하는 방법은 getStaticProps에서 반환하는 객체에서 props 키값 데이터 뿐만 아니라 revalidate 라는 키를 추가하기만 하면 된다.
ex)
    return {
        props: {
          products: data.products,
        },
        revalidate: 10,
      };

단 개발하는동안에는 ISR과 관계 없이 모든 요청에 대해 페이지가 재생성된다. 하지만 프로덕션에서는 ISR이 동작한다.
 */

/*
ISR의 동작 원리

개발 서버가 시작되는 npm run dev가 아닌 npm run build => num start 를 해서 로컬 컴퓨터에서 프로덕션 준비 웹사이트를 확인해보자.
ISR은 브라우저에서도 아닌, 빌드 프로세스 중에서도 아닌 npm start로 배포된 후의 서버에서 실행된다.
따라서 revalidate으로 정한 시간 후 새로고침을 해보면 getStaticProps에 정의한 로직이 돌아가는 것을 확인 할 수 있으며,
revalidate으로 시간이 지나기 전에 새로고침을 하면 로직이 돌아가지 않는 것을 확인할 수 있다.
 */

/*
getStaticProps 의 추가 기능

데이터 페칭에 오류가 생긴 경우 유용하게 사용할 수 있는 기능

ex)
  if (!data) {
      return {
        redirect: {
          destination: "/보여줄 경로~",
        },
      };
    }

  if (data.products.length === 0) {
    return { notFound: true }; //404 페이지 렌더링
  }

이처럼 데이터 자체가 없으면 redirect키와 destination키를 통해 보여줄 경로로 이동 시킬 수 있으며
데이터가 없는 경우 notFound키 값을 true로 주면 자동으로 404 페이지를 렌더링 해준다.
 */
export default HomePage;
