
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, MessageCircle, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Bootcamp {
  id: number;
  name: string;
  description: string;
  category: string;
  rating: number;
  reviewCount: number;
  image: string;
  duration: string;
  price: string;
}

const mockBootcamps: Bootcamp[] = [
  {
    id: 1,
    name: "네이버 부스트캠프 웹·모바일",
    description: "실무 중심의 웹 개발 교육과정으로 6개월간 집중적으로 진행됩니다",
    category: "웹개발",
    rating: 4.8,
    reviewCount: 156,
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=200&fit=crop",
    duration: "6개월",
    price: "무료"
  },
  {
    id: 2,
    name: "코드스테이츠 소프트웨어 엔지니어링",
    description: "풀스택 개발자 양성을 위한 집중 부트캠프",
    category: "풀스택",
    rating: 4.6,
    reviewCount: 89,
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=200&fit=crop",
    duration: "4개월",
    price: "500만원"
  },
  {
    id: 3,
    name: "패스트캠퍼스 데이터사이언스",
    description: "데이터 분석부터 머신러닝까지 전문가 과정",
    category: "데이터사이언스",
    rating: 4.7,
    reviewCount: 234,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=200&fit=crop",
    duration: "5개월",
    price: "600만원"
  },
  {
    id: 4,
    name: "엘리스 AI 트랙",
    description: "인공지능과 머신러닝 전문가 양성 과정",
    category: "AI/ML",
    rating: 4.5,
    reviewCount: 67,
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=200&fit=crop",
    duration: "6개월",
    price: "450만원"
  },
  {
    id: 5,
    name: "위코드 백엔드 부트캠프",
    description: "백엔드 개발에 특화된 실무 중심 교육",
    category: "백엔드",
    rating: 4.4,
    reviewCount: 123,
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=400&h=200&fit=crop",
    duration: "3개월",
    price: "400만원"
  },
  {
    id: 6,
    name: "프로그래머스 프론트엔드 데브코스",
    description: "모던 프론트엔드 기술 스택 마스터하기",
    category: "프론트엔드",
    rating: 4.9,
    reviewCount: 198,
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=200&fit=crop",
    duration: "4개월",
    price: "550만원"
  }
];

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

const Index = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>("전체");
  
  const categories = ["전체", "웹개발", "풀스택", "데이터사이언스", "AI/ML", "백엔드", "프론트엔드"];
  
  const filteredBootcamps = selectedCategory === "전체" 
    ? mockBootcamps 
    : mockBootcamps.filter(camp => camp.category === selectedCategory);

  const handleBootcampClick = (id: number) => {
    navigate(`/bootcamp/${id}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-purple-100 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                <Star className="text-white" size={24} />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                부캠마스터
              </h1>
            </div>
            <p className="text-gray-600 text-sm hidden md:block">
              실제 수료생들의 솔직한 후기로 선택하는 부트캠프
            </p>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            나에게 맞는 부트캠프를 찾아보세요
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            실제 수료생들의 생생한 후기와 별점을 확인하고, 직접 대화까지 나눠보세요
          </p>
          
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={`${
                  selectedCategory === category 
                    ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white border-0"
                    : "border-purple-200 hover:border-purple-300"
                }`}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Bootcamp Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBootcamps.map((bootcamp) => (
            <Card 
              key={bootcamp.id} 
              className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white/80 backdrop-blur-sm border-purple-100 cursor-pointer"
              onClick={() => handleBootcampClick(bootcamp.id)}
            >
              <div className="aspect-video overflow-hidden rounded-t-lg">
                <img 
                  src={bootcamp.image} 
                  alt={bootcamp.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                    {bootcamp.category}
                  </Badge>
                  <span className="text-sm font-semibold text-green-600">{bootcamp.price}</span>
                </div>
                <CardTitle className="text-lg leading-tight">{bootcamp.name}</CardTitle>
                <CardDescription className="text-sm">{bootcamp.description}</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center justify-between mb-4">
                  <StarRating rating={bootcamp.rating} />
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <MessageCircle size={14} />
                    <span>{bootcamp.reviewCount}개 리뷰</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    📅 {bootcamp.duration}
                  </span>
                  <Button 
                    size="sm" 
                    className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white border-0"
                  >
                    자세히 보기
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white/50 backdrop-blur-sm border-t border-purple-100 mt-16">
        <div className="container mx-auto px-4 py-8 text-center">
          <p className="text-gray-600">
            © 2024 부캠마스터. 더 나은 부트캠프 선택을 위해 함께합니다.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
