function UserIdPage(props) {
  return <h1>{props.id}</h1>;
}

export default UserIdPage;

export async function getServerSideProps(context) {
  const { params, res, req } = context;

  const userId = params.uid;
  return {
    props: {
      id: `userid-${userId}`,
    },
  };
}

/*
동적 경로 파일에서 getStaticProps를 사용할 때는 getStaticPaths를 함께 사용해 Next.js에 어떤 페이지의 인스턴스를 사전 생성할지 알려줘야하지만
getServerSideProps를 사용하면 그럴 필요가 없다.

[ getServerSideProps만 사용했을 때 getStaticPaths 함수를 사용하지 않고도 코드가 정상적으로 작동한 이유 ]
getServerSideProps는 서버에서만 작동하므로 Next.js에서는 아무 페이지도 사전 생성할 필요가 없고 따라서 사전 생성할 대상이 없으니
getStaticPaths 정보도 필요가 없다.
=> getServerSideProps를 사용하면 서버 사이드 코드에서 모든 요청을 처리하기 때문에 사전 생성할 필요도 없고, 동적 경로 또한 미리 설정할 필요도 없다. 
 */

/*
getServerSideProps와 getStaticProps vs getStaticPaths
- 정적인 사전 생성그리고 서버에서만 실행되는 서버 측 코드의 차이 확실하게 알기

컴포넌트에 사용하는 데이터를 서버에서 미리 준비해서 클라이언트에게 완성된 페이지를 제공하면 사용자 경험을 개선할 수 있으며, 사용자들은 처음부터
완성된 페이지에서 모든 콘텐츠를 이용할 수 있게 된다. 또한 SEO 최적화에도 큰 도움이 된다
 */
