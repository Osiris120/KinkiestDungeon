// This is based on DisplacementFilter

let erasefragment = `

varying vec2 vFilterCoord;
varying vec2 vTextureCoord;

uniform mat2 rotation;
uniform sampler2D uSampler;
uniform sampler2D mapSampler;

uniform highp vec4 inputSize;
uniform vec4 inputClamp;

void main(void)
{
  vec4 map = texture2D(mapSampler, vFilterCoord);
  vec4 color = texture2D(uSampler, vTextureCoord);

  // If map.a == 0 then it will always be 100% alpha
  // If map.a == 1 then it will be map.r alpha
  color.rgba *= clamp(map.r + 1. - map.a, 0., 1.);

  gl_FragColor = color;
}
`;

let erasevertex = `
attribute vec2 aVertexPosition;

uniform mat3 projectionMatrix;
uniform mat3 filterMatrix;

varying vec2 vTextureCoord;
varying vec2 vFilterCoord;

uniform vec4 inputSize;
uniform vec4 outputFrame;

vec4 filterVertexPosition( void )
{
    vec2 position = aVertexPosition * max(outputFrame.zw, vec2(0.)) + outputFrame.xy;

    return vec4((projectionMatrix * vec3(position, 1.0)).xy, 0.0, 1.0);
}

vec2 filterTextureCoord( void )
{
    return aVertexPosition * (outputFrame.zw * inputSize.zw);
}

void main(void)
{
	gl_Position = filterVertexPosition();
	vTextureCoord = filterTextureCoord();
	vFilterCoord = ( filterMatrix * vec3( vTextureCoord, 1.0)  ).xy;
}
`;



let occlusionfragment = `

varying vec2 vFilterCoord;
varying vec2 vTextureCoord;

uniform mat2 rotation;
uniform sampler2D uSampler;
uniform sampler2D mapSampler;

uniform vec2 scale;
uniform highp vec4 inputSize;
uniform vec4 inputClamp;

void main(void)
{
  vec4 map = texture2D(mapSampler, vFilterCoord);
  vec4 mapL = texture2D(mapSampler, clamp(vec2(vFilterCoord.x - 0.01 * scale.x, vFilterCoord.y - 0.005 * scale.y),
        inputClamp.xy,
        inputClamp.zw));
  vec4 mapR = texture2D(mapSampler, clamp(vec2(vFilterCoord.x + 0.01 * scale.x, vFilterCoord.y - 0.005 * scale.y),
        inputClamp.xy,
        inputClamp.zw));
  vec4 colorL = texture2D(uSampler, clamp(vec2(vTextureCoord.x - 0.015 * scale.x, vTextureCoord.y - 0.01 * scale.y),
        inputClamp.xy,
        inputClamp.zw));
  vec4 colorR = texture2D(uSampler, clamp(vec2(vTextureCoord.x + 0.015 * scale.x, vTextureCoord.y - 0.01 * scale.y),
        inputClamp.xy,
        inputClamp.zw));


  vec4 mapU = texture2D(mapSampler, clamp(vec2(vFilterCoord.x, vFilterCoord.y - 0.01 * scale.y),
        inputClamp.xy,
        inputClamp.zw));
  vec4 mapD = texture2D(mapSampler, clamp(vec2(vFilterCoord.x, vFilterCoord.y + 0.01 * scale.y),
        inputClamp.xy,
        inputClamp.zw));
  vec4 colorU = texture2D(uSampler, clamp(vec2(vTextureCoord.x, vTextureCoord.y - 0.015 * scale.y),
        inputClamp.xy,
        inputClamp.zw));
  vec4 colorD = texture2D(uSampler, clamp(vec2(vTextureCoord.x, vTextureCoord.y + 0.015 * scale.y),
        inputClamp.xy,
        inputClamp.zw));

  vec4 color = texture2D(uSampler, vTextureCoord);
  // sorcery
  // I dont even know how this works myself
  color.rgba *= clamp(1.
    - clamp((mapL.a - mapR.a) * abs(1. - colorR.a), 0., 1.)
    - clamp((mapR.a - mapL.a) * abs(1. - colorL.a), 0., 1.)
    - 0.5*clamp((mapU.a - mapD.a) * abs(1. - colorD.a), 0., 1.)
    - 0.5*clamp((mapD.a - mapU.a) * abs(1. - colorU.a), 0., 1.)
    , 0., 1.);

  gl_FragColor = color;
}
`;

let occlusionvertex = `
attribute vec2 aVertexPosition;

uniform mat3 projectionMatrix;
uniform mat3 filterMatrix;

varying vec2 vTextureCoord;
varying vec2 vFilterCoord;

uniform vec4 inputSize;
uniform vec4 outputFrame;

vec4 filterVertexPosition( void )
{
    vec2 position = aVertexPosition * max(outputFrame.zw, vec2(0.)) + outputFrame.xy;

    return vec4((projectionMatrix * vec3(position, 1.0)).xy, 0.0, 1.0);
}

vec2 filterTextureCoord( void )
{
    return aVertexPosition * (outputFrame.zw * inputSize.zw);
}

void main(void)
{
	gl_Position = filterVertexPosition();
	vTextureCoord = filterTextureCoord();
	vFilterCoord = ( filterMatrix * vec3( vTextureCoord, 1.0)  ).xy;
}
`;



let displacefragment = `
varying vec2 vFilterCoord;
varying vec2 vTextureCoord;

uniform vec2 scale;
uniform mat2 rotation;
uniform sampler2D uSampler;
uniform sampler2D mapSampler;

uniform highp vec4 inputSize;
uniform vec4 inputClamp;

void main(void)
{
  vec4 map =  texture2D(mapSampler, vFilterCoord);

  map.xy -= 0.5;
  map.xy = scale * inputSize.zw * (rotation * map.xy);

  gl_FragColor = texture2D(uSampler,
    clamp(vec2(vTextureCoord.x + (map.x + 1. - map.a), vTextureCoord.y + (map.y + 1. - map.a)),
        inputClamp.xy,
        inputClamp.zw));
}
`;

let displacevertex = `
attribute vec2 aVertexPosition;

uniform mat3 projectionMatrix;
uniform mat3 filterMatrix;

varying vec2 vTextureCoord;
varying vec2 vFilterCoord;

uniform vec4 inputSize;
uniform vec4 outputFrame;

vec4 filterVertexPosition( void )
{
    vec2 position = aVertexPosition * max(outputFrame.zw, vec2(0.)) + outputFrame.xy;

    return vec4((projectionMatrix * vec3(position, 1.0)).xy, 0.0, 1.0);
}

vec2 filterTextureCoord( void )
{
    return aVertexPosition * (outputFrame.zw * inputSize.zw);
}

void main(void)
{
	gl_Position = filterVertexPosition();
	vTextureCoord = filterTextureCoord();
	vFilterCoord = ( filterMatrix * vec3( vTextureCoord, 1.0)  ).xy;
}
`;



class EraseFilter extends PIXI.Filter
{
    public maskSprite: ISpriteMaskTarget;
    public maskMatrix: PIXIMatrix;

    /**
     * @param {PIXI.Sprite} sprite - The sprite used for the displacement map. (make sure its added to the scene!)
     * @param scale - The scale of the displacement
     */
    constructor(sprite: ISpriteMaskTarget)
    {
        const maskMatrix = new PIXI.Matrix();

        sprite.renderable = false;

        super(erasevertex, erasefragment, {
            mapSampler: sprite._texture,
            filterMatrix: maskMatrix,
            scale: { x: 1, y: 1 },
            rotation: new Float32Array([1, 0, 0, 1]),
        });

        this.maskSprite = sprite;
        this.maskMatrix = maskMatrix;
    }

    /**
     * Applies the filter.
     * @param filterManager - The manager.
     * @param input - The input target.
     * @param output - The output target.
     * @param clearMode - clearMode.
     */
    public apply(
        filterManager: PIXIFilterSystem,
        input: PIXIRenderTexture,
        output: PIXIRenderTexture,
        clearMode: PIXICLEAR_MODES
    ): void
    {
        if (!this.uniformGroup?.uniforms || !this.uniforms) {
            KDFilterCacheToDestroy.push(this);
            return;
        }
        // fill maskMatrix with _normalized sprite texture coords_
        this.uniforms.filterMatrix = filterManager.calculateSpriteMatrix(this.maskMatrix, this.maskSprite);

        // Extract rotation from world transform
        const wt = this.maskSprite.worldTransform;
        const lenX = Math.sqrt((wt.a * wt.a) + (wt.b * wt.b));
        const lenY = Math.sqrt((wt.c * wt.c) + (wt.d * wt.d));

        if (lenX !== 0 && lenY !== 0)
        {
            this.uniforms.rotation[0] = wt.a / lenX;
            this.uniforms.rotation[1] = wt.b / lenX;
            this.uniforms.rotation[2] = wt.c / lenY;
            this.uniforms.rotation[3] = wt.d / lenY;
        }

        // draw the filter...
        filterManager.applyFilter(this, input, output, clearMode);
    }

    /** The texture used for the displacement map. Must be power of 2 sized texture. */
    get map(): PIXITexture
    {
        return this.uniforms.mapSampler;
    }

    set map(value: PIXITexture)
    {
        this.uniforms.mapSampler = value;
    }
}

class DisplaceFilter extends PIXI.Filter
{
    public maskSprite: ISpriteMaskTarget;
    public maskMatrix: PIXIMatrix;
    public scale: PIXIPoint;

    /**
     * @param {PIXI.Sprite} sprite - The sprite used for the displacement map. (make sure its added to the scene!)
     * @param scale - The scale of the displacement
     */
    constructor(sprite: ISpriteMaskTarget, scale?: number)
    {
        const maskMatrix = new PIXI.Matrix();

        sprite.renderable = false;

        super(displacevertex, displacefragment, {
            mapSampler: sprite._texture,
            filterMatrix: maskMatrix,
            scale: { x: 1, y: 1 },
            rotation: new Float32Array([1, 0, 0, 1]),
        });

        this.maskSprite = sprite;
        this.maskMatrix = maskMatrix;

        if (scale === null || scale === undefined)
        {
            scale = 20;
        }

        /**
         * scaleX, scaleY for displacements
         * @member {PIXI.Point}
         */
        this.scale = new PIXI.Point(scale, scale);
    }

    /**
     * Applies the filter.
     * @param filterManager - The manager.
     * @param input - The input target.
     * @param output - The output target.
     * @param clearMode - clearMode.
     */
    public apply(
        filterManager: PIXIFilterSystem,
        input: PIXIRenderTexture,
        output: PIXIRenderTexture,
        clearMode: PIXICLEAR_MODES
    ): void
    {
        if (!this.uniformGroup?.uniforms || !this.uniforms) {
            KDFilterCacheToDestroy.push(this);
            return;
        }
        // fill maskMatrix with _normalized sprite texture coords_
        this.uniforms.filterMatrix =
            filterManager.calculateSpriteMatrix(this.maskMatrix, this.maskSprite);
        this.uniforms.scale.x = this.scale.x;
        this.uniforms.scale.y = this.scale.y;

        // Extract rotation from world transform
        const wt = this.maskSprite.worldTransform;
        const lenX = Math.sqrt((wt.a * wt.a) + (wt.b * wt.b));
        const lenY = Math.sqrt((wt.c * wt.c) + (wt.d * wt.d));

        if (lenX !== 0 && lenY !== 0)
        {
            this.uniforms.rotation[0] = wt.a / lenX;
            this.uniforms.rotation[1] = wt.b / lenX;
            this.uniforms.rotation[2] = wt.c / lenY;
            this.uniforms.rotation[3] = wt.d / lenY;
        }

        // draw the filter...
        filterManager.applyFilter(this, input, output, clearMode);
    }

    /** The texture used for the displacement map. Must be power of 2 sized texture. */
    get map(): PIXITexture
    {
        return this.uniforms.mapSampler;
    }

    set map(value: PIXITexture)
    {
        this.uniforms.mapSampler = value;
    }
}



class OcclusionFilter extends PIXI.Filter
{
    public maskSprite: ISpriteMaskTarget;
    public maskMatrix: PIXIMatrix;
    public scale: PIXIPoint;

    /**
     * @param {PIXI.Sprite} sprite - The sprite used for the displacement map. (make sure its added to the scene!)
     * @param scale - The scale of the displacement
     */
    constructor(sprite: ISpriteMaskTarget, scale?: number)
    {
        const maskMatrix = new PIXI.Matrix();

        sprite.renderable = false;

        super(occlusionvertex, occlusionfragment, {
            mapSampler: sprite._texture,
            filterMatrix: maskMatrix,
            scale: { x: 1, y: 1 },
            rotation: new Float32Array([1, 0, 0, 1]),
        });
        if (scale === null || scale === undefined)
        {
            scale = 20;
        }
        /**
         * scaleX, scaleY for displacements
         * @member {PIXI.Point}
         */
        this.scale = new PIXI.Point(scale, scale);

        this.maskSprite = sprite;
        this.maskMatrix = maskMatrix;
    }

    /**
     * Applies the filter.
     * @param filterManager - The manager.
     * @param input - The input target.
     * @param output - The output target.
     * @param clearMode - clearMode.
     */
    public apply(
        filterManager: PIXIFilterSystem,
        input: PIXIRenderTexture,
        output: PIXIRenderTexture,
        clearMode: PIXICLEAR_MODES
    ): void
    {
        // fill maskMatrix with _normalized sprite texture coords_
        this.uniforms.filterMatrix = filterManager.calculateSpriteMatrix(this.maskMatrix, this.maskSprite);

        // Extract rotation from world transform
        const wt = this.maskSprite.worldTransform;
        const lenX = Math.sqrt((wt.a * wt.a) + (wt.b * wt.b));
        const lenY = Math.sqrt((wt.c * wt.c) + (wt.d * wt.d));

        if (lenX !== 0 && lenY !== 0)
        {
            this.uniforms.rotation[0] = wt.a / lenX;
            this.uniforms.rotation[1] = wt.b / lenX;
            this.uniforms.rotation[2] = wt.c / lenY;
            this.uniforms.rotation[3] = wt.d / lenY;
        }

        // draw the filter...
        filterManager.applyFilter(this, input, output, clearMode);
    }

    /** The texture used for the displacement map. Must be power of 2 sized texture. */
    get map(): PIXITexture
    {
        return this.uniforms.mapSampler;
    }

    set map(value: PIXITexture)
    {
        this.uniforms.mapSampler = value;
    }
}