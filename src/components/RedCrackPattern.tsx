import React from 'react';

const RedCrackPattern = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div className="relative w-full overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[#191919]" />
        <svg className="absolute w-0 h-0 overflow-hidden">
          <filter id="cracks">
            <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="5" seed="10" result="noise" />
            <feColorMatrix type="luminanceToAlpha" in="noise" result="alphaNoise" />
            <feComponentTransfer in="alphaNoise" result="plates">
              <feFuncA type="discrete" tableValues="0 1" />
            </feComponentTransfer>
            <feConvolveMatrix order="3 3" kernelMatrix="-1 -1 -1 -1  3 -1 -1 -1 -1" in="plates" result="edges" />
            <feComponentTransfer in="edges" result="invertedEdges">
              <feFuncR type="table" tableValues="1 0" />
              <feFuncG type="table" tableValues="1 0" />
              <feFuncB type="table" tableValues="1 0" />
            </feComponentTransfer>
            <feFlood floodColor="#dc2626" result="bgColor" />
            <feComposite operator="in" in="bgColor" in2="invertedEdges" />
          </filter>
        </svg>
        <div className="absolute inset-0 opacity-70" style={{ backgroundImage: 'url("data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"100\" height=\"100\"><rect width=\"100%\" height=\"100%\" fill=\"%23191919\"/><filter id=\"cracks\"><feTurbulence type=\"fractalNoise\" baseFrequency=\"0.02\" numOctaves=\"5\" seed=\"10\" result=\"noise\"/><feColorMatrix type=\"luminanceToAlpha\" in=\"noise\" result=\"alphaNoise\"/><feComponentTransfer in=\"alphaNoise\" result=\"plates\"><feFuncA type=\"discrete\" tableValues=\"0 1\"/></feComponentTransfer><feConvolveMatrix order=\"3 3\" kernelMatrix=\"-1 -1 -1 -1 3 -1 -1 -1 -1\" in=\"plates\" result=\"edges\"/><feComponentTransfer in=\"edges\" result=\"invertedEdges\"><feFuncR type=\"table\" tableValues=\"1 0\"/><feFuncG type=\"table\" tableValues=\"1 0\"/><feFuncB type=\"table\" tableValues=\"1 0\"/></feComponentTransfer><feFlood floodColor=\"%23dc2626\" result=\"bgColor\"/><feComposite operator=\"in\" in=\"bgColor\" in2=\"invertedEdges\"/></filter><rect width=\"100%\" height=\"100%\" filter=\"url(%23cracks)\"/></svg>")' }} />
      </div>
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default RedCrackPattern;
