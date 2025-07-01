
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Star, ArrowLeft, Upload, Check, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const mockBootcampDetails = {
  1: {
    name: "네이버 부스트캠프 웹·모바일",
    category: "웹개발"
  },
  2: {
    name: "코드스테이츠 소프트웨어 엔지니어링",
    category: "풀스택"
  }
};

const WriteReview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [step, setStep] = useState<"upload" | "verified" | "writing">("upload");
  const [certificateFile, setCertificateFile] = useState<File | null>(null);
  const [rating, setRating] = useState(0);
  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewContent, setReviewContent] = useState("");
  const [course, setCourse] = useState("");
  
  const bootcampId = parseInt(id || "1");
  const bootcamp = mockBootcampDetails[bootcampId as keyof typeof mockBootcampDetails] || mockBootcampDetails[1];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setCertificateFile(file);
    }
  };

  const handleCertificateSubmit = () => {
    if (!certificateFile) {
      toast({
        title: "파일을 선택해주세요",
        description: "수료증 파일을 업로드해주세요.",
        variant: "destructive"
      });
      return;
    }
    
    // 목업: 인증 과정 시뮬레이션
    setStep("verified");
    toast({
      title: "수료증 인증 완료!",
      description: "수료증이 성공적으로 인증되었습니다. 이제 리뷰를 작성할 수 있습니다.",
    });
  };

  const handleReviewSubmit = () => {
    if (!rating || !reviewTitle || !reviewContent || !course) {
      toast({
        title: "필수 항목을 모두 입력해주세요",
        description: "별점, 제목, 내용, 수강 과정을 모두 입력해주세요.",
        variant: "destructive"
      });
      return;
    }

    // 목업: 리뷰 제출 시뮬레이션
    toast({
      title: "리뷰가 성공적으로 등록되었습니다!",
      description: "다른 사용자들에게 도움이 되는 소중한 후기를 남겨주셔서 감사합니다.",
    });
    
    setTimeout(() => {
      navigate(`/bootcamp/${id}`);
    }, 2000);
  };

  const StarRating = ({ rating, onRatingChange, interactive = false }: { 
    rating: number; 
    onRatingChange?: (rating: number) => void;
    interactive?: boolean;
  }) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={24}
            className={`${
              star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
            } ${interactive ? 'cursor-pointer hover:text-yellow-400' : ''}`}
            onClick={() => interactive && onRatingChange?.(star)}
          />
        ))}
      </div>
    );
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
              onClick={() => navigate(`/bootcamp/${id}`)}
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

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="flex items-center space-x-4">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                step === "upload" ? "bg-purple-500 text-white" : "bg-green-500 text-white"
              }`}>
                {step === "upload" ? "1" : <Check size={16} />}
              </div>
              <div className={`h-1 w-16 ${step === "verified" || step === "writing" ? "bg-green-500" : "bg-gray-300"}`}></div>
              <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                step === "verified" ? "bg-purple-500 text-white" : 
                step === "writing" ? "bg-green-500 text-white" : "bg-gray-300 text-gray-600"
              }`}>
                {step === "writing" ? <Check size={16} /> : "2"}
              </div>
              <div className={`h-1 w-16 ${step === "writing" ? "bg-green-500" : "bg-gray-300"}`}></div>
              <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                step === "writing" ? "bg-purple-500 text-white" : "bg-gray-300 text-gray-600"
              }`}>
                3
              </div>
            </div>
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {step === "upload" && "수료증 제출"}
              {step === "verified" && "인증 완료"}
              {step === "writing" && "리뷰 작성"}
            </h2>
            <p className="text-gray-600">
              {step === "upload" && "부트캠프 수료증을 업로드해주세요"}
              {step === "verified" && "수료증이 인증되었습니다"}
              {step === "writing" && "솔직한 후기를 작성해주세요"}
            </p>
          </div>
        </div>

        {/* Bootcamp Info */}
        <Card className="bg-white/80 backdrop-blur-sm border-purple-100 mb-8">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                {bootcamp.category}
              </Badge>
            </div>
            <CardTitle className="text-xl">{bootcamp.name}</CardTitle>
            <CardDescription>이 부트캠프에 대한 리뷰를 작성합니다</CardDescription>
          </CardHeader>
        </Card>

        {/* Step 1: Certificate Upload */}
        {step === "upload" && (
          <Card className="bg-white/80 backdrop-blur-sm border-purple-100">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload size={20} />
                수료증 업로드
              </CardTitle>
              <CardDescription>
                부트캠프 수료증을 업로드하면 자동으로 인증됩니다
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="border-2 border-dashed border-purple-200 rounded-lg p-8 text-center">
                <FileText size={48} className="mx-auto text-gray-400 mb-4" />
                <div className="space-y-2">
                  <p className="text-gray-600">수료증 파일을 선택해주세요</p>
                  <p className="text-sm text-gray-500">PDF, JPG, PNG 파일을 지원합니다</p>
                </div>
                <Input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFileUpload}
                  className="mt-4 max-w-xs mx-auto"
                />
                {certificateFile && (
                  <p className="mt-2 text-sm text-green-600">
                    선택된 파일: {certificateFile.name}
                  </p>
                )}
              </div>
              <Button 
                onClick={handleCertificateSubmit}
                className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
              >
                수료증 제출하기
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Verification Complete */}
        {step === "verified" && (
          <Card className="bg-white/80 backdrop-blur-sm border-green-200">
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <Check size={32} className="text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-green-800">인증이 완료되었습니다!</h3>
                <p className="text-gray-600">수료증이 성공적으로 인증되었습니다. 이제 리뷰를 작성할 수 있습니다.</p>
                <Button 
                  onClick={() => setStep("writing")}
                  className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
                >
                  리뷰 작성하기
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Write Review */}
        {step === "writing" && (
          <Card className="bg-white/80 backdrop-blur-sm border-purple-100">
            <CardHeader>
              <CardTitle>리뷰 작성</CardTitle>
              <CardDescription>
                다른 사용자들에게 도움이 되는 솔직한 후기를 작성해주세요
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  전체적인 만족도 <span className="text-red-500">*</span>
                </label>
                <StarRating rating={rating} onRatingChange={setRating} interactive={true} />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  수강한 과정 <span className="text-red-500">*</span>
                </label>
                <Input
                  placeholder="예: 풀스택, 프론트엔드, 백엔드 등"
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  리뷰 제목 <span className="text-red-500">*</span>
                </label>
                <Input
                  placeholder="리뷰 제목을 입력해주세요"
                  value={reviewTitle}
                  onChange={(e) => setReviewTitle(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  상세 리뷰 <span className="text-red-500">*</span>
                </label>
                <Textarea
                  placeholder="부트캠프에 대한 솔직한 후기를 작성해주세요. 커리큘럼, 멘토링, 취업 지원 등에 대해 자세히 작성해주시면 다른 분들에게 큰 도움이 됩니다."
                  rows={8}
                  value={reviewContent}
                  onChange={(e) => setReviewContent(e.target.value)}
                />
              </div>

              <Button 
                onClick={handleReviewSubmit}
                className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
                size="lg"
              >
                리뷰 등록하기
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default WriteReview;
