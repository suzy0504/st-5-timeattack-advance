import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { todoApi } from "../api/todos";

export default function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();

  // TODO: useQuery 로 리팩터링 하세요.

  // const [isLoading, setIsLoading] = useState(true);
  // const [error, setError] = useState(null);
  // const [data, setData] = useState(null);

  const {
    data: todos,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["id"],
    queryFn: fetchDetail,
  });

  const fetchDetail = async () => {
    const response = await todoApi(`/todos/${id}`);
    return setData(response.data);
  };

  if (isPending) return <div style={{ fontSize: 36 }}>로딩중...</div>;

  if (isError) {
    console.error(isError);
    return (
      <div style={{ fontSize: 24 }}>에러가 발생했습니다: {isError.message}</div>
    );
  }

  return (
    <div>
      <button onClick={() => navigate("/")}>홈으로 이동</button>
      <p>제목: {data.title}</p>
      <p>내용: {data.contents}</p>
      <p>작성일자: {new Date(data.createdAt).toDateString()}</p>
    </div>
  );
}
