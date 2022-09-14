import path from "path";
import fs from "fs/promises";
import React, { Fragment } from "react";

function ProductDetailPage(props) {
  const { loadedProduct } = props;

  if (!loadedProduct) {
    return <p>loading</p>;
  }

  return (
    <Fragment>
      <h1>{loadedProduct.title}</h1>
    </Fragment>
  );
}

export default ProductDetailPage;

async function getData() {
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);
  return data;
}

/*
이렇게만 하면 오류나는 걸 볼 수 있음 

[이유는 !!]
Next.js는 기본적으로 모든 페이지를 사전 생성하는데, 동적 페이지에서는 그렇지 않음
왜냐하면 동적 페이지는 엄밀하게 말하면 하나의 페이지가 아니라 여러 페이지로 이루어져있다고 봐도 무방하기 때문이다.
즉 Next.js는 사전에 동적 페이지를 위해서 얼마나 많은 페이지를 미리 생성해야 하는지 알지 못하기때문이다.

그렇다면 getStaticProps함수 추가 이전에는 왜 동작했을까?
=> 기본적으로 사전 생성되지 못하고 대신 서버에서 항상 그때그때 생성했던 것!
그런데 getStaticProps함수를 추가하였기 때문에 현재는 오류가 난다. (getStaticProps함수는 사전에 페이지를 렌더링하도록 Next.js에 요청하는 것이나 마찬가지 이므로)

[그래서 오류를 해결하려면?]
Next.js에서 동적 경로에 어떤 값에 대한 페이지가 사전 생성되어야하는지 알아야 그 페이지의 여러 인스턴스를 사전 생성할 수 있다.
getStaticPaths() 함수를 사용하면 된다!
*/
export async function getStaticProps(context) {
  const { params } = context;

  const pId = params.pid;

  const data = await getData();

  const product = data.products.filter((item) => item.id === pId);

  return {
    props: {
      loadedProduct: product[0],
    },
  };
}

/*
[getStaticPaths]
- 동적 페이지의 어떤 인스턴스를 사전에 생성할지 Next.js에 알리는 것
- paths키에 params라는 키를 가진 객체 배열을 리턴함
- 아래와 같이 구현하면 Next.js가 각 pid에 대해 getStaticProps를 세번 호출하고 다음으로 함수 내부에서처럼 해당 ID를 추출할 수 있다.

[fallback 키]
- fallback 키를 true로 설정하면 paths에 포함되지 않은 페이지라도 페이지 방문 시 로딩되는 값이 유효할 수 있도록 Next.js에 요청할 수 있다.
다만 사전에 생성되는 것이 아닌 요청이 서버에 도달하는 순간 그 시점에 생성된다.
여기서 문제는 링크를 클릭한 이동이 아닌, url에 직접 입력하여 페이지에 접근하면 오류가 나오는데 이는 동적 사전 생성 기능이 즉시 끝나지 않기 때문이다.
따라서 fallback 기능을 쓰려면 컴포넌트에 폴백 데어티 상태를 체크 해줘야한다. (즉 getStaticProps에서 리턴되는 데이터가 있는지 체크하라는 뜻)

- 그렇다면 fallback을 어떻게 잘 활용할까?
예를 들어 어떤 블로그나 쇼핑몰 사이트를 만들었을 때 수많은 게시물 중 빈번하게 호출되는 혹은 거의 호출되지 않는 페이지가 있을 것이다.
이때 거의 호출되지 않는 페이지의 사전 생성은 시간과 자원 낭비이므로, 빈번하게 호출되는 페이지만 paths에 넣어주어 사전 렌더링 하도록하고
fallback : true로 설정하여 거의 호출되지 않는 페이지는 호출하는 시점에 생성하도록 처리한다.

- fallback을 false, true가 아닌 문자열 'blocking'으로 설정하는 경우
컴포넌트에서 폴백 데이터 확인을 할 필요가 없다. 왜냐하면 페이지를 서비스 제공하기 전에 서버에서 완전히 사전 생성하도록 기다리는 설정이기 때문이다.
이렇게 처리하면 페이지 방문자가 응답받는 시간은 길어지지만 특별하게 데이터 체크를 할 필요가 없다.

- 애플리케이션의 필요한 접근방법에 따라 fallback 키의 설정을 바꿔서 사용하자!

 */

export async function getStaticPaths() {
  const data = await getData();
  const ids = data.products.map((product) => product.id);
  const paramsData = ids.map((id) => ({ params: { pid: id } }));

  return {
    paths: paramsData,
    fallback: false,
  };
}

// export async function getStaticPaths() {
//   return {
//     paths: [
//       { params: { pid: "p1" } },
//       { params: { pid: "p2" } },
//       { params: { pid: "p3" } },
//     ],
//     fallback: false,
//   };
// }
