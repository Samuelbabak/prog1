/* classes */ 
const inputTriangles2 = [
    {
      "material": {"ambient": [0.1,0.1,0.1], "diffuse": [0.0,0.6,0.0], "specular": [1,1,1], "n": 5},
      "vertices": [
                      [0.25, 0.25, 0.25],[0.5, 0.75, 0.25],[0.75,0.25,0.25],
                      [0.23, 0.23, 0.26],[-0.04, -0.33, 0.8],[-0.21, 0.44, 0.52]
                  ],
      "triangles": [[0,1,2], [3,4,5]]
    },
    {
      "material": {"ambient": [0.1,0.1,0.1], "diffuse": [0.9,0.2,0.5], "specular": [0.8,0.8,0.8], "n":7},
      "vertices": [
                      [0.83,0.04,1.06],[0.20,0.30,-0.30],[0.10,-0.38,0.56]
                  ],
      "triangles": [[0,1,2]]
    },
    {
      "material": {"ambient": [0.3,0.3,0.3], "diffuse": [0.6,0.6,0.0], "specular": [0.7,0.7,0.7], "n":9},
      "vertices": [
                      [-0.068,0.76,0.41],[-0.02,0.66,0.41],[-0.11,0.66,0.41],
                      [-0.14,0.85,0.46],[-0.09,0.75,0.46],[-0.19,0.75,0.46],
                      [-0.16,0.76,0.41],[-0.12,0.66,0.41],[-0.21,0.66,0.41]
                  ],
      "triangles": [[0,1,2],[3,4,5],[6,7,8]]
    }
  ]
  
// Color constructor
class Color {
    constructor(r,g,b,a) {
        try {
            if ((typeof(r) !== "number") || (typeof(g) !== "number") || (typeof(b) !== "number") || (typeof(a) !== "number"))
                throw "color component not a number";
            else if ((r<0) || (g<0) || (b<0) || (a<0)) 
                throw "color component less than 0";
            else if ((r>255) || (g>255) || (b>255) || (a>255)) 
                throw "color component bigger than 255";
            else {
                this.r = r; this.g = g; this.b = b; this.a = a; 
            }
        } // end try
        
        catch (e) {
            console.log('error', e);
        }
    } // end Color constructor

        // Color change method
    change(r,g,b,a) {
        try {
            if ((typeof(r) !== "number") || (typeof(g) !== "number") || (typeof(b) !== "number") || (typeof(a) !== "number"))
                throw "color component not a number";
            else if ((r<0) || (g<0) || (b<0) || (a<0)) 
                throw "color component less than 0";
            else if ((r>255) || (g>255) || (b>255) || (a>255)) 
                throw "color component bigger than 255";
            else {
                this.r = r; this.g = g; this.b = b; this.a = a; 
            }
        } // end throw
        
        catch (e) {
            console.log(e);
        }
    } // end Color change method
} // end color class


/* utility functions */

// draw a pixel at x,y using color
function drawPixel(imagedata,x,y,color) {
    try {
        if ((typeof(x) !== "number") || (typeof(y) !== "number"))
            throw "drawpixel location not a number";
        else if ((x<0) || (y<0) || (x>=imagedata.width) || (y>=imagedata.height))
            throw "drawpixel location outside of image";
        else if (color instanceof Color) {
            var pixelindex = (y*imagedata.width + x) * 4;
            imagedata.data[pixelindex] = color.r;
            imagedata.data[pixelindex+1] = color.g;
            imagedata.data[pixelindex+2] = color.b;
            imagedata.data[pixelindex+3] = color.a;
        } else 
            throw "drawpixel color is not a Color";
    } // end try
    
    catch(e) {
        console.log(e);
    }
} // end drawPixel
    
// draw random pixels
function drawRandPixels(context) {
    var c = new Color(0,0,0,0); // the color at the pixel: black
    var w = context.canvas.width;
    var h = context.canvas.height;
    var imagedata = context.createImageData(w,h);
    const PIXEL_DENSITY = 0.01;
    var numPixels = (w*h)*PIXEL_DENSITY; 
    
    // Loop over 1% of the pixels in the image
    for (var x=0; x<numPixels; x++) {
        c.change(Math.random()*255,Math.random()*255,
            Math.random()*255,255); // rand color
        drawPixel(imagedata,
            Math.floor(Math.random()*w),
            Math.floor(Math.random()*h),
                c);
    } // end for x
    context.putImageData(imagedata, 0, 0);
} // end draw random pixels

// get the input ellipsoids from the standard class URL
function getInputEllipsoids() {
    const INPUT_ELLIPSOIDS_URL = 
        "https://ncsucgclass.github.io/prog1/ellipsoids.json";
        
    // load the ellipsoids file
    var httpReq = new XMLHttpRequest(); // a new http request
    httpReq.open("GET",INPUT_ELLIPSOIDS_URL,false); // init the request
    httpReq.send(null); // send the request
    var startTime = Date.now();
    while ((httpReq.status !== 200) && (httpReq.readyState !== XMLHttpRequest.DONE)) {
        if ((Date.now()-startTime) > 3000)
            break;
    } // until its loaded or we time out after three seconds
    if ((httpReq.status !== 200) || (httpReq.readyState !== XMLHttpRequest.DONE)) {
        console.log*("Unable to open input ellipses file!");
        return String.null;
    } else
        return JSON.parse(httpReq.response); 
} // end get input ellipsoids

//get the input triangles from the standard class URL
function getInputFile(file_url) {
    const url = file_url
        
    // load the triangles file
    var httpReq = new XMLHttpRequest(); // a new http request
    httpReq.open("GET",url,false); // init the request
    httpReq.send(null); // send the request
    var startTime = Date.now();
    while ((httpReq.status !== 200) && (httpReq.readyState !== XMLHttpRequest.DONE)) {
        if ((Date.now()-startTime) > 3000)
            break;
    } // until its loaded or we time out after three seconds
    if ((httpReq.status !== 200) || (httpReq.readyState !== XMLHttpRequest.DONE)) {
        console.log*("Unable to open input triangles file!");
        return String.null;
    } else
        return JSON.parse(httpReq.response); 
} // end get input triangles

//get the input boxex from the standard class URL
function getInputBoxes() {
    const INPUT_BOXES_URL = 
        "https://ncsucgclass.github.io/prog1/boxes.json";
        
    // load the boxes file
    var httpReq = new XMLHttpRequest(); // a new http request
    httpReq.open("GET",INPUT_BOXES_URL,false); // init the request
    httpReq.send(null); // send the request
    var startTime = Date.now();
    while ((httpReq.status !== 200) && (httpReq.readyState !== XMLHttpRequest.DONE)) {
        if ((Date.now()-startTime) > 3000)
            break;
    } // until its loaded or we time out after three seconds
    if ((httpReq.status !== 200) || (httpReq.readyState !== XMLHttpRequest.DONE)) {
        console.log*("Unable to open input boxes file!");
        return String.null;
    } else
        return JSON.parse(httpReq.response); 
} // end get input boxes

class Vector {
    constructor (startCoord, endCoord) {
        this.start = startCoord
        this.end = endCoord
    }
    // constructor (endCoord) {
    //     this.start = (0, 0, 0)
    //     this.end = endCoord
    // }
}

function add(v1, v2) {
    let v1x0 = v1.start[0], v1y0 = v1.start[1], v1z0 = v1.start[2];
    let v1x = v1.end[0], v1y = v1.end[1], v1z = v1.end[2];

    let v2x0 = v2.start[0], v2y0 = v2.start[1], v2z0 = v2.start[2];
    let v2x = v2.end[0];
    let v2y = v2.end[1];
    let v2z = v2.end[2];
    // console.log('v2', v2.end)

    let newx0 = v1x0 + v2x0;
    let newy0 = v1y0 + v2y0;
    let newz0 = v1z0 + v2z0;
    let newx = v1x + v2x;
    let newy = v1y + v2y;
    let newz = v1z + v2z;

    let newVector = new Vector([newx0, newy0, newz0], [newx, newy, newz])
    // console.log('new', newVector)
    return newVector
};

function mul(v1, c) {
    // print(v1)

    let v1x0 = v1.start[0], v1y0 = v1.start[1], v1z0 = v1.start[2];
    let v1x = v1.end[0], v1y = v1.end[1], v1z = v1.end[2];
    
    v1x -= v1x0;
    v1y -= v1y0;
    v1z -= v1z0;

    return new Vector([0, 0, 0], [v1x * c, v1y * c, v1z * c])
}

function sub(v1, v2) {
    let v1x0 = v1.start[0], v1y0 = v1.start[1], v1z0 = v1.start[2];
    let v1x = v1.end[0], v1y = v1.end[1], v1z = v1.end[2];

    let v2x0 = v2.start[0], v2y0 = v2.start[1], v2z0 = v2.start[2];
    let v2x = v2.end[0], v2y = v2.end[1], v2z = v2.end[2];

    let newx0 = v1x0 - v2x0;
    let newy0 = v1y0 - v2y0;
    let newz0 = v1z0 - v2z0;
    let newx = v1x - v2x;
    let newy = v1y - v2y;
    let newz = v1z - v2z;

    return new Vector([newx0, newy0, newz0], [newx, newy, newz]);
};
function cross(v1, v2) {
    // Calculate the displacement for v1 (from start to end)
    let v1x = v1.end[0] - v1.start[0];
    let v1y = v1.end[1] - v1.start[1];
    let v1z = v1.end[2] - v1.start[2];

    // Calculate the displacement for v2 (from start to end)
    let v2x = v2.end[0] - v2.start[0];
    let v2y = v2.end[1] - v2.start[1];
    let v2z = v2.end[2] - v2.start[2];

    // Perform the cross product calculation using the displacements
    let crossX = v1y * v2z - v1z * v2y;
    let crossY = v1z * v2x - v1x * v2z;
    let crossZ = v1x * v2y - v1y * v2x;

    // Return a new vector representing the cross product result
    return new Vector([0, 0, 0], [crossX, crossY, crossZ]);
}


function vectorLength(v1) {
    let v1x = v1.end[0] - v1.start[0];
    let v1y = v1.end[1] - v1.start[1];
    let v1z = v1.end[2] - v1.start[2];

    return Math.sqrt(Math.pow(v1x, 2) + Math.pow(v1y, 2) + Math.pow(v1z, 2));
}

function dot(v1, v2) {
    let v1x = v1.end[0] - v1.start[0];
    let v1y = v1.end[1] - v1.start[1];
    let v1z = v1.end[2] - v1.start[2];

    let v2x = v2.end[0] - v2.start[0];
    let v2y = v2.end[1] - v2.start[1];
    let v2z = v2.end[2] - v2.start[2];

    return v1x * v2x + v1y * v2y + v1z * v2z;
}

function deg(angle){
    return angle * Math.PI / 180;
}

function normalize(v1) {
    let v1x = v1.end[0] - v1.start[0];
    let v1y = v1.end[1] - v1.start[1];
    let v1z = v1.end[2] - v1.start[2];

    let len = Math.sqrt(v1x * v1x + v1y * v1y + v1z * v1z);

    return new Vector([0, 0, 0], [v1x / len, v1y / len, v1z / len]);
}

function pos(v1) {
    let v1x0 = v1.start[0];
    let v1y0 = v1.start[1];
    let v1z0 = v1.start[2];
    let v1x = v1.end[0]
    let v1y = v1.end[1]
    let v1z = v1.end[2];

    return new Vector([-v1x0, -v1y0, -v1z0], [-v1x, -v1y, -v1z]);
}
// returns true if positive
function sign(plane_normal, intersection, triangleP1, triangleP2) {
    return dot(plane_normal, cross(sub(intersection, new Vector([0, 0, 0], triangleP1)), sub(new Vector([0, 0, 0], triangleP2), new Vector([0, 0, 0], triangleP1)))) >= 0
}
const LIGHT_COORDINATES = new Vector([0, 0, 0], [-3, 1, -0.5]);

var EYE_LOCATION = new Vector([0, 0, 0], [0.5, 0.5, -0.5]);
var VIEW_UP_VECTOR = new Vector([0, 0, 0], [0, 1, 0]);
var LOOK_AT_VECTOR = new Vector([0, 0, 0], [0, 0, 1]);

var WINDOW_DISTANCE = 0.5;
var ASPECT_RATIO = 1;
var WINDOW_CENTER = add(EYE_LOCATION, mul(LOOK_AT_VECTOR, WINDOW_DISTANCE));
var VERTICAL_ANGLE = 45;
var HORIZONTAL_ANGLE = 45;

var SCREEN_HEIGHT = Math.tan(deg(VERTICAL_ANGLE)) * WINDOW_DISTANCE * 2;
var SCREEN_WIDTH = Math.tan(deg(HORIZONTAL_ANGLE)) * WINDOW_DISTANCE * 2;
var DISTANCE = mul(LOOK_AT_VECTOR, WINDOW_DISTANCE);

var RIGHT_VECTOR = pos(normalize(cross(LOOK_AT_VECTOR, VIEW_UP_VECTOR)));
var WINDOW_TOP_LEFT = add(
    add(WINDOW_CENTER, mul(RIGHT_VECTOR, -SCREEN_WIDTH / 2)),
    mul(VIEW_UP_VECTOR, SCREEN_HEIGHT / 2)
);


// Function to update the values based on input from HTML
function updateValues() {
    VERTICAL_ANGLE = parseFloat(document.getElementById('verticalAngle').value);
    HORIZONTAL_ANGLE = parseFloat(document.getElementById('horizontalAngle').value);
    EYE_LOCATION.end[0] = parseFloat(document.getElementById('x').value);
    EYE_LOCATION.end[1] = parseFloat(document.getElementById('y').value);
    EYE_LOCATION.end[2] = parseFloat(document.getElementById('z').value);

    VIEW_UP_VECTOR.end[0] = parseFloat(document.getElementById('lookupX').value);
    VIEW_UP_VECTOR.end[1] = parseFloat(document.getElementById('lookupY').value);
    VIEW_UP_VECTOR.end[2] = parseFloat(document.getElementById('lookupZ').value);
    LOOK_AT_VECTOR.end[0] = parseFloat(document.getElementById('lookatX').value);
    LOOK_AT_VECTOR.end[1] = parseFloat(document.getElementById('lookatY').value);
    LOOK_AT_VECTOR.end[2] = parseFloat(document.getElementById('lookatZ').value);

    VIEW_UP_VECTOR = normalize(VIEW_UP_VECTOR);
    LOOK_AT_VECTOR = normalize(LOOK_AT_VECTOR);

    WINDOW_CENTER = add(EYE_LOCATION, mul(LOOK_AT_VECTOR, WINDOW_DISTANCE));
    SCREEN_HEIGHT = Math.tan(deg(VERTICAL_ANGLE)) * WINDOW_DISTANCE * 2;
    SCREEN_WIDTH = Math.tan(deg(HORIZONTAL_ANGLE)) * WINDOW_DISTANCE * 2;
    DISTANCE = mul(LOOK_AT_VECTOR, WINDOW_DISTANCE);
    RIGHT_VECTOR = pos(normalize(cross(LOOK_AT_VECTOR, VIEW_UP_VECTOR)));
    WINDOW_TOP_LEFT = add(
        add(WINDOW_CENTER, mul(RIGHT_VECTOR, -SCREEN_WIDTH / 2)),
        mul(VIEW_UP_VECTOR, SCREEN_HEIGHT / 2)
    );

    main()
}
let inputs = []
let input = 1
function switchInput() {
    if (input == 0 ){
        input = 1
    } else if (input == 1) {
        input = 0
    }
    main()
    
}

// Add event listeners to the input elements
document.getElementById('horizontalAngle').addEventListener('input', updateValues);
document.getElementById('verticalAngle').addEventListener('input', updateValues);

document.getElementById('x').addEventListener('input', updateValues);
document.getElementById('y').addEventListener('input', updateValues);
document.getElementById('z').addEventListener('input', updateValues);

document.getElementById('lookupX').addEventListener('input', updateValues);
document.getElementById('lookupY').addEventListener('input', updateValues);
document.getElementById('lookupZ').addEventListener('input', updateValues);

document.getElementById('lookatX').addEventListener('input', updateValues);
document.getElementById('lookatY').addEventListener('input', updateValues);
document.getElementById('lookatZ').addEventListener('input', updateValues);

updateValues()


// const DISTANCE = mul(LOOK_AT_VECTOR, WINDOW_DISTANCE)
// const WINDOW_TOP_LEFT = new Vector([0, 0, 0], [DISTANCE.end[0] + EYE_LOCATION.end[0] - SCREEN_WIDTH / 2, DISTANCE[1] + EYE_LOCATION.end[1] + SCREEN_HEIGHT / 2, DISTANCE[2] + EYE_LOCATION.end[2]]);
// console.log(WINDOW_TOP_LEFT)

// const WINDOW_TOP_LEFT = new Vector([0, 0, 0], [
//     DISTANCE.end[0] + EYE_LOCATION.end[0] + SCREEN_WIDTH / 2 - dot(VIEW_UP_VECTOR, mul(LOOK_AT_VECTOR, WINDOW_DISTANCE)),
//     DISTANCE.end[1] + EYE_LOCATION.end[1] + SCREEN_HEIGHT / 2 - dot(VIEW_UP_VECTOR, mul(LOOK_AT_VECTOR, WINDOW_DISTANCE)),
//     DISTANCE.end[2] + EYE_LOCATION.end[2] - dot(VIEW_UP_VECTOR, mul(LOOK_AT_VECTOR, WINDOW_DISTANCE))
// ]);

//put random points in the triangles from the class github
function drawTriangles(context) {

    let inputs = [getInputFile('https://ncsucgclass.github.io/prog1/triangles.json'), inputTriangles2]
    let inputTriangles = inputs[input]
    let lights = [LIGHT_COORDINATES];
    // let lights = getInputFile('https://ncsucgclass.github.io/prog1/lights.json');

    var w = context.canvas.width;
    var h = context.canvas.height;
    var imagedata = context.createImageData(w,h);
    
    for (let i = 0; i < imagedata.data.length; i += 4) {
        imagedata.data[i] = 0;     // Red
        imagedata.data[i + 1] = 0; // Green
        imagedata.data[i + 2] = 0; // Blue
        imagedata.data[i + 3] = 255; // Alpha
    }

    var distanceArray = Array(w).fill().map(() => Array(h).fill(null));
    if (inputTriangles != String.null) { 

        var c = new Color(0,0,0,0); // init the triangle color
        var n = inputTriangles.length; // the number of input files
        //console.log("number of files: " + n);
        // console.log(n)

        // Loop over the triangles, draw rand pixels in each
        for (var f=0; f<n; f++) {
        	var tn = inputTriangles[f].triangles.length;
        	//console.log("number of triangles in this files: " + tn);
        	
        	// Loop over the triangles, draw each in 2d
        	for(var t=0; t<tn; t++){
        		var vertex1 = inputTriangles[f].triangles[t][0];
        		var vertex2 = inputTriangles[f].triangles[t][1];
        		var vertex3 = inputTriangles[f].triangles[t][2];

        		var vertexPos1 = inputTriangles[f].vertices[vertex1];
        		var vertexPos2 = inputTriangles[f].vertices[vertex2];
        		var vertexPos3 = inputTriangles[f].vertices[vertex3];
        		//console.log("vertexPos1 " + vertexPos1);
        		//console.log("vertexPos2 " + vertexPos2);
        		//console.log("vertexPos3 " + vertexPos3);

            	for (var width=0; width<w; width+= 1) {
                    for(let height=0; height<h; height += 1) {
                        var point; // on canvas plane
                        
                        point = [width, height];
                        
                        // plane checking 
                        let current_pixel_location = new Vector([0, 0, 0], [(width/w) * SCREEN_WIDTH, (height/h) * SCREEN_HEIGHT * -1, 0])

                        let world_pixel_location = add(WINDOW_TOP_LEFT, current_pixel_location)
                        let ray_delta = sub(world_pixel_location, EYE_LOCATION)
                        
                        let plane_normal = pos(normalize(cross(new Vector(vertexPos1, vertexPos2), new Vector(vertexPos1, vertexPos3))));

                        let d = dot(plane_normal, new Vector([0, 0, 0], vertexPos1))
                        
                        if(dot(plane_normal, ray_delta) == 0) {
                            // drawPixel(imagedata,point[0],point[1], new Color(0,0,0,255));
                        } else {
                            // This is t
                            let ray_distance_to_intersect = (d - dot(plane_normal, EYE_LOCATION)) / dot(plane_normal, ray_delta)
                            // console.log( ray_delta, ray_distance_to_intersect)
                            if(ray_distance_to_intersect < 1){
                                // drawPixel(imagedata,point[0],point[1], new Color(255,0,0,255));
                                // console.log('miss1')
                            } else {
                                let intersection = add(EYE_LOCATION, mul(ray_delta, ray_distance_to_intersect))
                                let side1 = sign(plane_normal, intersection, vertexPos1, vertexPos2)
                                let side2 = sign(plane_normal, intersection, vertexPos2, vertexPos3)
                                let side3 = sign(plane_normal, intersection, vertexPos3, vertexPos1)
                                // console.log(side1, side2, side3)
                                let distance = vectorLength(mul(ray_delta, ray_distance_to_intersect))
                                if(side1 && side2 && side3) {
                                    if(distanceArray[width][height] == null || distanceArray[width][height] >= distance) {
                                        let r = 0
                                        let g = 0
                                        let b = 0
                                        for(const light in lights){
                                            let vector_to_light = pos(normalize(sub(LIGHT_COORDINATES, intersection)));
                                            let viewDirection = pos(normalize(sub(EYE_LOCATION, intersection)));
                                            
                                            let normalFacingCamera = dot(plane_normal, viewDirection);
                                            
                                            r += 255 * inputTriangles[f].material.ambient[0];
                                            g += 255 * inputTriangles[f].material.ambient[1];
                                            b += 255 * inputTriangles[f].material.ambient[2];

                                            if (normalFacingCamera > 0) {
                                                let dif = Math.max(0, dot(plane_normal, vector_to_light));
                                            
                                                let bounce = sub(vector_to_light, mul(plane_normal, 2 * dot(vector_to_light, plane_normal)));
                                                bounce = normalize(bounce);
                                            
                                                let half = normalize(add(vector_to_light, viewDirection));
                                            
                                                let specularFactor = Math.max(0, dot(half, plane_normal)) ** inputTriangles[f].material.n;
                                            
                                                // Apply lighting calculations
                                                r += Math.max(0, Math.min(255, 255 * (inputTriangles[f].material.diffuse[0] * dif + inputTriangles[f].material.specular[0] * specularFactor)));
                                                g += Math.max(0, Math.min(255, 255 *  (inputTriangles[f].material.diffuse[1] * dif + inputTriangles[f].material.specular[1] * specularFactor)));
                                                b += Math.max(0, Math.min(255, 255 * (inputTriangles[f].material.diffuse[2] * dif + inputTriangles[f].material.specular[2] * specularFactor)));
                                            }
                                        } 

                                        c.change(
                                            Math.max(0, Math.min(255, r)),
                                            Math.max(0, Math.min(255, g)),
                                            Math.max(0, Math.min(255, b)),
                                            255
                                        );
                                        
                                        
                                        
                                        // Draw the pixel
                                        drawPixel(imagedata, point[0], point[1], c);
                                        
                                        // Store the distance in the distance array
                                        distanceArray[width][height] = distance;
                                        
                                    }
                                } else {
                                    // drawPixel(imagedata,point[0],point[1], new Color(0,0,0,255));
                                    // console.log('miss2')
                                }
                            }
                        }


                        // var t1 = ((point[0]-v2[0]) * (v1[1] - v2[1]) - (v1[0] - v2[0]) * (point[1] - v2[1])) * Math.cos(30 * (180 / Math.PI)) < 0.0;
                        // var t2 = ((point[0]-v3[0]) * (v2[1] - v3[1]) - (v2[0] - v3[0]) * (point[1] - v3[1])) < 0.0;
                        // var t3 = ((point[0]-v1[0]) * (v3[1] - v1[1]) - (v3[0] - v1[0]) * (point[1] - v1[1])) < 0.0;
                        // if((t1==t2)&&(t2==t3)) // draw the pixel if inside the triangle
                        //     drawPixel(imagedata,point[0],point[1],c);

                    }
                	//console.log("color: ("+c.r+","+c.g+","+c.b+")");
                	//console.log("x: "+ x);
                	//console.log("y: "+ y);
            	} // end for pixels in triangle
        	} // end for triangles
    	} // end for files
        context.putImageData(imagedata, 0, 0);
        console.log('done')
    } // end if triangle file found
} // end draw rand pixels in input triangles



function main() {

    // Get the canvas and context
    var canvas = document.getElementById("viewport"); 
    var context = canvas.getContext("2d");
 
    // Create the image
    // drawRandPixels(context);
      // shows how to draw pixels

    drawTriangles(context)

    
    // drawRandPixelsInInputEllipsoids(context);
    // shows how to draw pixels and read input file
      
    // drawInputEllipsoidsUsingArcs(context);
      // shows how to read input file, but not how to draw pixels
    
    // drawRandPixelsInInputTriangles(context);
      // shows how to draw pixels and read input file
    
    // drawInputTrainglesUsingPaths(context);
      // shows how to read input file, but not how to draw pixels
    
    // drawRandPixelsInInputBoxes(context);
      // shows how to draw pixels and read input file
    
    // drawInputBoxesUsingPaths(context);
      // shows how to read input file, but not how to draw pixels
}
