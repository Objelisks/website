#!/usr/bin/env runhaskell

import qualified Data.ByteString.Lazy as B

tag t body = 
    let joined = concat body
    in "<" ++ t ++ ">" ++ joined ++ "</" ++ t ++ ">"

tagattr t a = "<" ++ t ++ " " ++ a ++ ">" ++ "</" ++ t ++ ">"

imgsrc img = tagattr "img" ("src=\"" ++ img ++ "\"")

get_headers imgFile = do
    --file <- B.readFile imgFile
    --lines file
    "header"

create_header img = tag "div" [
    imgsrc img,
    get_headers img]

create_content = "<content></content>"

main = putStrLn $
    tag "html" [
        tag "head" [
            tag "title" ["home"]
        ],
        tag "body" [
            create_header "./header.bmp",
            create_content
        ]
    ]