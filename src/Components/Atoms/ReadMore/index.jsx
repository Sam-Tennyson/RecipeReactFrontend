//base
import React, { useState, useRef, useEffect } from "react";
import Linkify from "linkify-react";

//styles
import "./style.scss";

const ReadMore = ({ content, count_ref=null,readMoreText = "...Read More", readLessText = "Read Less", isListing=false, handleListingRead=() => {} }) => {

    const [isReadMore, setIsReadMore] = useState(true);
    const [characterCount, setCharacterCount] = useState(null)

    const toggleReadMore = () => {
        setIsReadMore(!isReadMore);
    };

    function convertTextToHTML(text) {
        return text?.replace(/\n/g, '<br>');
    }

    useEffect(() => {
        setCharacterCount(count_ref  || 300)
    }, [])

     return (
        <Linkify options={{target : "_blank"}}>
            {isReadMore ? (
                <span dangerouslySetInnerHTML={{__html: convertTextToHTML(content?.slice(0, characterCount))}} />
            ) : (
                <span dangerouslySetInnerHTML={{__html: convertTextToHTML(content)}} />
            )}
            {content?.length > characterCount ?
            <span onClick={() => isListing ?handleListingRead() :toggleReadMore()} className="text-primary read-more-btn ml-1">
                {isReadMore ? readMoreText : readLessText}
            </span> : null}
        </Linkify>
    );
};

export default ReadMore;