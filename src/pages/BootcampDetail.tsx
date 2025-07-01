
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Star, MessageCircle, ArrowLeft, Users, Clock, DollarSign } from "lucide-react";

interface Review {
  id: number;
  author: string;
  rating: number;
  date: string;
  content: string;
  course: string;
}

const mockReviews: Review[] = [
  {
    id: 1,
    author: "김개발",
    rating: 5,
    date: "2024-01-15",
    content: "정말 실무 중심의 커리큘럼이었습니다. 6개월이 짧게 느껴질 정도로 알찬 내용들이었고, 특히 팀 프로젝트를 통해 협업하는 법을 배울 수 있어서 좋았습니다. 취업도 수료 후 2개월 만에 성공했어요!",
    course: "웹 풀스택"
  },
  {
    id: 2,
    author: "박프론트",
    rating: 4,
    date: "2024-01-10",
    content: "멘토링 시스템이 정말 잘 되어있어요. 막히는 부분이 있을 때마다 언제든 질문할 수 있고, 현업 개발자분들의 실무 경험담을 들을 수 있어서 도움이 많이 됐습니다. 다만 진도가 좀 빠른 편이라 따라가기 힘들 때도 있었어요.",
    course: "프론트엔드"
  },
  {
    id: 3,
    author: "이백엔드",
    rating: 5,
    date: "2024-01-05",
    content: "코딩테스트 준비부터 기술면접까지 체계적으로 도와주셔서 감사했습니다. 무엇보다 실제 서비스를 만들어보는 경험이 가장 값졌어요. 포트폴리오 퀄리티도 많이 올라갔습니다.",
    course: "백엔드"
  },
  {
    id: 4,
    author: "정풀스택",
    rating: 4,
    date: "2023-12-28",
    content: "동기들과 함께 성장할 수 있는 환경이 정말 좋았습니다. 서로 도움도 주고받고, 스터디도 함께 하면서 끝까지 포기하지 않고 완주할 수 있었어요. 취업 지원도 끝까지 해주셔서 감사합니다.",
    course: "풀스택"
  }
];

const mockBootcampDetails = {
  1: {
    name: "네이버 부스트캠프 웹·모바일",
    description: "실무 중심의 웹 개발 교육과정으로 6개월간 집중적으로 진행됩니다",
    category: "웹개발",
    rating: 4.8,
    reviewCount: 156,
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=400&fit=crop",
    duration: "6개월",
    price: "무료",
    curriculum: [
      "HTML/CSS/JavaScript 기초",
      "React & Node.js",
      "데이터베이스 (MySQL, MongoDB)",
      "팀 프로젝트 (2회)",
      "코딩테스트 대비",
      "취업 멘토링"
    ],
    benefits: [
      "무료 교육 (네이버 지원)",
      "현업 멘토 1:1 지원",
      "팀 프로젝트 경험",
      "취업 연계 프로그램",
      "수료증 발급"
    ]
  }
};

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={16}
          className={`${
            star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
          }`}
        />
      ))}
      <span className="ml-1 text-sm font-medium text-gray-700">{rating}</span>
    </div>
  );
};

const BootcampDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showChat, setShowChat] = useState(false);
  
  const bootcampId = parseInt(id || "1");
  const bootcamp = mockBootcampDetails[bootcampId as keyof typeof mockBootcampDetails] || mockBootcampDetails[1];

  const handleChatStart = () => {
    setShowChat(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-purple-100 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate("/")}
              className="hover:bg-purple-100"
            >
              <ArrowLeft size={20} />
            </Button>
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
              <Star className="text-white" size={16} />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              부캠마스터
            </h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="mb-8">
          <div className="aspect-video md:aspect-[3/1] overflow-hidden rounded-xl mb-6">
            <img 
              src={bootcamp.image} 
              alt={bootcamp.name}
              className="w-full h-full object-cover"
            />
          </div>
          
          <Card className="bg-white/80 backdrop-blur-sm border-purple-100">
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                      {bootcamp.category}
                    </Badge>
                    <span className="text-lg font-semibold text-green-600">{bootcamp.price}</span>
                  </div>
                  <CardTitle className="text-2xl md:text-3xl mb-2">{bootcamp.name}</CardTitle>
                  <CardDescription className="text-base">{bootcamp.description}</CardDescription>
                </div>
                
                <div className="flex flex-col items-start md:items-end gap-2">
                  <StarRating rating={bootcamp.rating} />
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <MessageCircle size={14} />
                    <span>{bootcamp.reviewCount}개 리뷰</span>
                  </div>
                  <Button 
                    onClick={handleChatStart}
                    className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white border-0"
                  >
                    <Users size={16} className="mr-2" />
                    수료자와 대화하기
                  </Button>
                </div>
              </div>
            </CardHeader>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* 커리큘럼 */}
            <Card className="bg-white/80 backdrop-blur-sm border-purple-100">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock size={20} />
                  커리큘럼
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {bootcamp.curriculum.map((item, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* 리뷰 섹션 */}
            <Card className="bg-white/80 backdrop-blur-sm border-purple-100">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle size={20} />
                  수료생 리뷰 ({mockReviews.length}개)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {mockReviews.map((review) => (
                    <div key={review.id}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full flex items-center justify-center text-white text-sm font-bold">
                            {review.author[0]}
                          </div>
                          <div>
                            <span className="font-medium">{review.author}</span>
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                              <Badge variant="outline" className="text-xs">{review.course}</Badge>
                              <span>{review.date}</span>
                            </div>
                          </div>
                        </div>
                        <StarRating rating={review.rating} />
                      </div>
                      <p className="text-gray-700 leading-relaxed">{review.content}</p>
                      {review.id !== mockReviews[mockReviews.length - 1].id && (
                        <Separator className="mt-4" />
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* 혜택 */}
            <Card className="bg-white/80 backdrop-blur-sm border-purple-100">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign size={20} />
                  제공 혜택
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {bootcamp.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* 기본 정보 */}
            <Card className="bg-white/80 backdrop-blur-sm border-purple-100">
              <CardHeader>
                <CardTitle>기본 정보</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">교육 기간</span>
                  <span className="font-medium">{bootcamp.duration}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">교육비</span>
                  <span className="font-medium text-green-600">{bootcamp.price}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">평균 평점</span>
                  <span className="font-medium">{bootcamp.rating}/5.0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">리뷰 수</span>
                  <span className="font-medium">{bootcamp.reviewCount}개</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Chat Modal */}
      {showChat && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md max-h-[80vh] overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-purple-500 to-blue-500 text-white">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">수료자와 대화</CardTitle>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setShowChat(false)}
                  className="text-white hover:bg-white/20"
                >
                  ✕
                </Button>
              </div>
              <CardDescription className="text-purple-100">
                김개발님이 대화에 참여했습니다
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 max-h-96 overflow-y-auto">
              <div className="space-y-4">
                <div className="flex gap-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    김
                  </div>
                  <div className="bg-gray-100 rounded-lg p-3 max-w-xs">
                    <p className="text-sm">안녕하세요! 네이버 부스트캠프 수료생 김개발입니다. 궁금한 점이 있으시면 언제든 물어보세요! 😊</p>
                  </div>
                </div>
                <div className="flex gap-2 justify-end">
                  <div className="bg-purple-500 text-white rounded-lg p-3 max-w-xs">
                    <p className="text-sm">안녕하세요! 부트캠프 난이도가 어떤가요?</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    김
                  </div>
                  <div className="bg-gray-100 rounded-lg p-3 max-w-xs">
                    <p className="text-sm">처음에는 따라가기 힘들었지만, 멘토분들이 정말 친절하게 도와주셔서 점차 적응할 수 있었어요. 무엇보다 동기들과 함께 하니까 포기하지 않고 끝까지 할 수 있었습니다!</p>
                  </div>
                </div>
              </div>
            </CardContent>
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <input 
                  type="text" 
                  placeholder="메시지를 입력하세요..."
                  className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <Button size="sm" className="bg-gradient-to-r from-purple-500 to-blue-500">
                  전송
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default BootcampDetail;
