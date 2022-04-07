import React, { useState, useEffect, useCallback } from "react"
import { useFrame } from 'react-three-fiber'
import { useGLTF } from '@react-three/drei'
import Node from '../Node'
import useLayers from '../../utils/use-layers'

const SmallFlower = ({ id, name, key, item, layers, glb, position, subFlowerLength, thisSection, contextValue, ...props }) => {
    const [bloomState, setBloomState] = useState(false)
    const { currentSection, setCurrentSubSection } =
    contextValue;
    const [hovered, setHover] = useState(false)
    useEffect(() => void (document.body.style.cursor = hovered ? "pointer" : "auto"), [hovered])
    useEffect(() => {
        setBloomState(currentSection===thisSection ? true : false)
    }, [currentSection]);
    const onClick = (event, value) => {
        //   e.preventDefault();
        event.stopPropagation();
        console.log("onclick subflower", value)
        setCurrentSubSection(value)

    }
    // console.log("subflower pos",position)

    // console.log("smallflower props", props)
    // console.log("id",id)

    const onPointerOver = useCallback(() => setHover(true), [])
    const onPointerOut = useCallback(() => setHover(false), [])
    const ref = useLayers(layers)
    useFrame(() => {
        if (ref.current) {
            ref.current.rotation.y -= 0.01 * .6
        }
    })




    const { nodes } = useGLTF(process.env.PUBLIC_URL + '/glb/' + (glb ? glb : 'smallflower') + '.glb')
    return (
        <group ref={ref}  {...props} scale={[.75,.75,.75]} position={position} onPointerOver={onPointerOver} onPointerOut={onPointerOut} onClick={(e) => {
            onClick(e, name)
        }}>
            {Object.values(nodes).map((node, index) => {
                const meshGeometry = node.geometry
                return meshGeometry ? (
                    <Node key={index} node={node} index={index} delay={0} bloomState={bloomState} contextValue={contextValue} capTexture={ '2E763A_78A0B7_B3D1CF_14F209'} />

                ) : null
            })}
        </group>
    )
}
//3B3C3F_DAD9D5_929290_ABACA8
// 3B6E10_E3F2C3_88AC2E_99CE51
// 'C7C7D7_4C4E5A_818393_6C6C74' 
//        '7877EE_D87FC5_75D9C7_1C78C0'             
export default SmallFlower